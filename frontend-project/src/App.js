import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });

    if (response.ok) {
      const data = await response.json();
      setUsers(prevUsers => [...prevUsers, data.user]); // Use previous state
      setName('');
      setEmail('');
    }
  };

  return (
    <div className="container">
      <h1 className="title">User Registration</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <button type="submit">Add User</button>
      </form>

      {/* Displaying users */}
      <h2>Users List</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index}>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))
        ) : (
          <p>No users found</p>
        )}
      </ul>
    </div>
  );
}

export default App;
