import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [backendData, setBackendData] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL; // Read from .env

  useEffect(() => {
    fetch(`${backendUrl}/api/data`)
      .then((response) => response.json())
      .then((data) => setBackendData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [backendUrl]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frontend Connected to Backend ✅</h1>
        {backendData ? (
          <div>
            <p>{backendData.message}</p>
            <p>Data: {backendData.data.join(', ')}</p>
          </div>
        ) : (
          <p>Loading data from backend...</p>
        )}
      </header>
    </div>
  );
}

export default App;
