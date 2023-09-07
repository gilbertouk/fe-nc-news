import axios from "axios";

const ncNewsUrl = axios.create({
  baseURL: "https://nc-news-api-ago9.onrender.com/api",
  // baseURL: "http://localhost:9090/api",
});

export function getAllArticles(query) {
  return ncNewsUrl.get(`/articles?${query}`).then((response) => {
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

export function getAllTopics() {
  return ncNewsUrl.get("/topics").then((response) => {
    return response.data;
  });
}

export function patchArticleById(article_id, article) {
  return ncNewsUrl.patch(`/articles/${article_id}`, article);
}

export function postArticleComment(article_id, comment) {
  return ncNewsUrl
    .post(`/articles/${article_id}/comments`, comment)
    .then((response) => {
      return response.data;
    });
}

export function deleteArticleComment(comment_id) {
  return ncNewsUrl.delete(`/comments/${comment_id}`);
}
