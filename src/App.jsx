import "./App.css";
import { Routes, Route } from "react-router-dom";
import { DisplayOfArticles } from "./Components/DisplayOfArticles";
import { Header } from "./Components/Header";
import { NavBar } from "./Components/NavBar";
import { DisplayArticlesByTopics } from "./Components/DisplayArticlesByTopics";
import { DisplayOneArticle } from "./Components/DisplayOneArticle";

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<DisplayOfArticles />} />
        <Route path="/topics" element={<DisplayArticlesByTopics />} />
        <Route path="/articles/:article_id" element={<DisplayOneArticle />} />
      </Routes>
    </div>
  );
}

export default App;
