import axios from "axios";

const ncNewsUrl = axios.create({
  baseURL: "https://nc-news-api-ago9.onrender.com/api",
});

export function getAllArticles() {
  return ncNewsUrl.get("/articles").then((response) => {
    return response.data;
  });
}

export function getArticleById(article_id) {
  return ncNewsUrl.get(`/articles/${article_id}`).then((response) => {
    return response.data;
  });
}

export function getArticleComments(article_id) {
  return ncNewsUrl.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data;
  });
}

export function patchArticleById(article_id, article) {
  return ncNewsUrl.patch(`/articles/${article_id}`, article);
}
