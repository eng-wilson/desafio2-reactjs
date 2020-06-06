import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api
      .get("repositories")
      .then((response) => setRepositories(repositories.concat(response)));
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories");

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const index = repositories.findIndex((repository) => repository.id === id);

    // if (repository >= 0) {
    await api.delete(`repositories/${id}`);

    repositories.splice(index, 1);

    setRepositories([...repositories]);
    // }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(123)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
