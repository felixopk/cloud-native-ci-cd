import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/data') // Ensure this URL matches your backend
      .then((response) => response.json())
      .then((data) => setBackendData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

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
