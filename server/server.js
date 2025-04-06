const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 3001;

// ✅ Allow CORS from your frontend (React) port
app.use(cors({
  origin: 'http://localhost:3002', // your React frontend URL
  credentials: true,
}));

// ✅ JSON parsing middleware
app.use(express.json());

// ✅ DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to the Database !!!");
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Connection failed:", error);
  });


  const userRoutes = require('./src/routes/userRoutes');
  app.use('/api/users', userRoutes); // ✅ this line expects a Router
  
