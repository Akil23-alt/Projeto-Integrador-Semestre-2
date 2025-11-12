// Etapa 6 - Rotas de Autenticação
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register - Registrar novo usuário
router.post('/register', authController.register);

// POST /api/auth/login - Login de usuário
router.post('/login', authController.login);

module.exports = router;