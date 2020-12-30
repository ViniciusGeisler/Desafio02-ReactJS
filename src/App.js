import React, { useState, useEffect } from "react";

import api from "./services/api"

import "./styles.css";

function App() {

  const [repositories, setRespositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRespositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Vinicius Geisler',
    });

    const repository = response.data

    setRespositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const repositoryIndex = repositories.findIndex(repositoryIndex => repositoryIndex.id === id)

      repositories.splice(repositoryIndex, 1)

      setRespositories([...repositories])
    
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {
          repositories.map(repository =>
            (<li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>

            </li>))
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
