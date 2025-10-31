const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Loads .env file

const app = express();

// --- Middleware ---
app.use(cors({ origin: 'http://localhost:5173' })); 
app.use(express.json()); 

// --- Database Connection ---
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// --- API Routes ---
// Public routes
app.use('/api/auth', require('./routes/auth.routes'));

// Private routes (protected by token)
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/classes', require('./routes/class.routes'));
app.use('/api/subjects', require('./routes/subject.routes'));
app.use('/api/marks', require('./routes/mark.routes'));
app.use('/api/materials', require('./routes/material.routes'));

// --- Start Server ---
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});