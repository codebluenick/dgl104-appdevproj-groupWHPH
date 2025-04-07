// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { handleLogin } = require('../controllers/authController');

// POST /api/auth/login
router.post('/login', handleLogin);

module.exports = router;
