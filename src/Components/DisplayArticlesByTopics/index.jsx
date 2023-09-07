import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./DisplayArticlesByTopics.css";
import { getAllTopics } from "../../utils/api";
import { ArticleList } from "../DisplayOfArticles/ArticleList";
import { ArticlesFilters } from "../DisplayOfArticles/ArticlesFilters";
import { NotFound } from "../CustomErrors";

export function DisplayArticlesByTopics() {
  const [error, setError] = useState(null);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  function onChangeQuery(event) {
    const newParams = new URLSearchParams(searchParams);
    const { name, value } = event.target;
    newParams.set(name, value);
    setSearchParams(newParams);
  }

  useEffect(() => {
    setIsLoading(true);
    getAllTopics()
      .then(({ topics }) => {
        setIsLoading(false);
        setTopics(topics);
      })
      .catch((err) => {
        setIsLoading(false);
        setError({ err });
      });
  }, []);

  if (error) {
    return (
      <NotFound
        message={error.err.response.data.msg}
        status={error.err.response.status}
      />
    );
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoading && !error) {
    return (
      <div className="display--container">
        <h3>Select the topic bellow</h3>
        <form>
          <label htmlFor="topics">Choose a topic:</label>
          <select
            id="topics"
            defaultValue=""
            onChange={onChangeQuery}
            name="topic"
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
        {searchParams.toString() !== "" ? (
          <div>
            <ArticlesFilters
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
            <ul className="card-list">
              <ArticleList query={searchParams.toString()} />
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
