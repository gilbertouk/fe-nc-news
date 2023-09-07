/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { DisplayOfArticles } from "./Components/DisplayOfArticles";
import { Header } from "./Components/Header";
import { NavBar } from "./Components/NavBar";
import { DisplayArticlesByTopics } from "./Components/DisplayArticlesByTopics";
import { DisplayOneArticle } from "./Components/DisplayOneArticle";
import { useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/topics" element={<DisplayArticlesByTopics />} />
        <Route path="/articles/:article_id" element={<DisplayOneArticle />} />
        <Route path="/topics/articles?" element={<DisplayArticlesByTopics />} />
        <Route path="/articles" element={<DisplayOfArticles />} />
      </Routes>
    </div>
  );
}

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/articles", { replace: true });
    }, 0);
  }, []);
}

export default App;
