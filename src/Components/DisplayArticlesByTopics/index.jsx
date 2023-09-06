import { useEffect, useState } from "react";
import "./DisplayArticlesByTopics.css";
import { getAllArticles, getAllTopics } from "../../utils/api";
import { ArticleCard } from "../DisplayOfArticles/ArticleList/ArticleCard";

export function DisplayArticlesByTopics() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [thereIsNoArticleToDisplay, setThereIsNoArticleToDisplay] =
    useState(false);

  useEffect(() => {
    setIsError(false);

    getAllTopics()
      .then(({ topics }) => {
        setTopics(topics);
      })
      .then(() => {
        if (selectedTopic !== "") {
          setIsError(false);
          setIsLoading(true);
          getAllArticles(selectedTopic)
            .then((response) => {
              setIsLoading(false);
              if (response.articles.length > 0) {
                setThereIsNoArticleToDisplay(false);
                setArticles(response.articles);
              } else if (response.articles.length === 0) {
                setThereIsNoArticleToDisplay(true);
                setArticles(response.articles);
              }
            })
            .catch(() => {
              setIsLoading(false);
              setIsError(true);
            });
        }
        return;
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [selectedTopic]);

  return (
    <div className="display--container">
      <h3>Select the topic bellow</h3>
      <form>
        <label htmlFor="topics">Choose a topic:</label>
        <select
          id="topics"
          defaultValue=""
          onChange={(event) => {
            setSelectedTopic(event.target.value);
          }}
        >
          <option key="selected" value="" disabled hidden>
            Choose here
          </option>
          {topics.map((topic) => {
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
      </form>
      {selectedTopic !== "" ? (
        articles.length !== 0 ? (
          <ul className="card-list">
            <ArticleCard newArticles={articles} />
          </ul>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}

      {thereIsNoArticleToDisplay && (
        <p>There are no articles registered for the topic {selectedTopic}</p>
      )}

      {isLoading && <p>Loading...</p>}

      {isError && <p>Whops, some error here... please reload the page!</p>}
    </div>
  );
}
