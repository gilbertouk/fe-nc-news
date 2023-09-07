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
  const limit = 10;

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getAllArticles(query)
      .then((data) => {
        setIsLoading(false);
        setNewArticles(data.articles);
        setTotalPages(Math.ceil(data.total_count / limit));
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [page, query]);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Whops, some error here... please reload the page!</p>;

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
}
