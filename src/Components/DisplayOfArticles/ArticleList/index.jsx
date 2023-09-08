/* eslint-disable react/prop-types */
import "./ArticleList.css";
import { useState, useEffect } from "react";
import { getAllArticles } from "../../../utils/api";
import { ArticleCard } from "./ArticleCard";
import { PaginationButton } from "./PaginationButton";

export function ArticleList({ query, setSearchParams, searchParams }) {
  const [newArticles, setNewArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [haveArticlesToDisplay, setHaveArticlesToDisplay] = useState(false);
  const limit = 10;

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getAllArticles(query)
      .then((data) => {
        setIsLoading(false);
        if (data.total_count > 0) {
          setHaveArticlesToDisplay(true);
        } else {
          setHaveArticlesToDisplay(false);
        }
        setNewArticles(data.articles);
        setTotalPages(Math.ceil(data.total_count / limit));
      })
      .catch(() => {
        setHaveArticlesToDisplay(false);
        setIsLoading(false);
        setIsError(true);
      });
  }, [page, query, haveArticlesToDisplay]);

  if (isLoading) return <p>Loading...</p>;

  if (haveArticlesToDisplay)
    return (
      <div>
        <ul className="card-list">
          <ArticleCard newArticles={newArticles} />
        </ul>

        <PaginationButton
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
      </div>
    );

  if (!haveArticlesToDisplay || isError) {
    return (
      <div>
        <p>There are no matching results.</p>
        <p>Improve your search results by:</p>
        <ul>
          <li>removing filters</li>
          <li>double-checking your spelling</li>
          <li>using fewer keywords</li>
          <li>searching for something less specific</li>
        </ul>
      </div>
    );
  }
}
