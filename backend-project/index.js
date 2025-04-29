const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONN_STR)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Define a Model (Example: Users)
const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', UserSchema);

// API Endpoints
app.post('/api/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json({ message: "User added!", user: newUser });
});

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Example task endpoint
app.get('/api/tasks', (req, res) => {
  res.json([
    { id: 1, title: 'Learn Kubernetes' },
    { id: 2, title: 'Fix 502 Gateway error' },
    { id: 3, title: 'Deploy Fullstack App' }
  ]);
});

// ✅ Healthcheck endpoint
app.get('/ok', (req, res) => {
  res.send('ok');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend running on port ${PORT}`));
