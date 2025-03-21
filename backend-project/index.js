const express = require('express'); 
const cors = require('cors'); // Allows frontend to access backend
const app = express();

// Middleware
app.use(cors()); // Enable CORS (Important for frontend communication)
app.use(express.json()); // Enable JSON parsing

// Sample API Endpoint
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend,hope we are connected now', data: [1, 2, 3, 4] });
});

// Default Route
app.get('/', (req, res) => {
  res.send('Hello, Backend is Running!');
});

// Define the port (use 5000 to match your frontend configuration)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
