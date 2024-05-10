import React from "react";
import "./App.css";
import GithubRepos from "./components/github-repo";

function App() {
  return (
    <>
      <div className="heading">GitHub Repository Search</div>
      <GithubRepos />
    </>
  );
}

export default App;
