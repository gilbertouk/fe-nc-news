import { Routes, Route } from "react-router-dom";
import "./App.css";
import { DisplayOfArticles } from "./Components/DisplayOfArticles";
import { Header } from "./Components/Header";
import { NavBar } from "./Components/NavBar";
import { DisplayOfTopics } from "./Components/DisplayOfTopics";

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<DisplayOfArticles />} />
        <Route path="/topics" element={<DisplayOfTopics />} />
      </Routes>
    </div>
  );
}

export default App;
