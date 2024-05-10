import React, { useEffect, useState, useRef } from "react";
import { FaRegStar } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import "./index.css";

function GithubRepos() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const debounceTimer = useRef();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (query.trim().length > 0) debounceSearch();
  }, [query]);

  const fetchReposData = async () => {
    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
      const data = await response.json();
      setResults(data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const debounceSearch = () => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchReposData();
    }, 500);
  };

  const handleKeyPress = (event) => {
    event.preventDefault();
    if (event.key === "Enter" && query.trim() !== "") {
      clearTimeout(debounceTimer.current);
      fetchReposData();
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search repositories..."
        value={query}
        onChange={handleChange}
        onKeyUp={handleKeyPress}
      />
      <div className="results">
        {Array.isArray(results) &&
          results.map((repo) => (
            <div key={repo.id} className="card">
              <div className="avatar">
                <img src={repo.owner.avatar_url} alt="Avatar" loading="lazy" />
              </div>
              <div className="text-xl word-break">{repo.full_name}</div>
              <div className="vertical-align gray-text">{repo.description}</div>
              <div className="gray-text">Language: {repo.language ? repo.language : "..."}</div>

              <div className="gray-text"> Created at: {new Date(repo.created_at).toDateString()}</div>
              <div className="gray-text"> Updated at: {new Date(repo?.updated_at).toDateString()}</div>
              <a href={repo.html_url} target="_blank" rel="noreferrer" className="github">
                View on GitHub
              </a>
              <div className="display-flex">
                <div className="h-8" title="Stars">
                  <span className="icon">
                    <FaRegStar size={20} />
                  </span>
                  {repo.stargazers_count}
                </div>
                <div className="h-8" title="Score">
                  Score: {repo.score}
                </div>
                <div className="h-8" title="Watchers count">
                  <span className="icon">
                    <FiEye size={20} />
                  </span>
                  {repo.watchers_count}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default GithubRepos;
