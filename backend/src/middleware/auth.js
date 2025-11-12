const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Obter token do header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Verificar se o token existe
    if (!token) {
      return res.status(401).json({ 
        error: 'Acesso negado. Token não fornecido.' 
      });
    }

    // Verificar e validar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Adicionar dados do usuário ao request
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    res.status(401).json({ 
      error: 'Token inválido ou expirado.' 
    });
  }
};

module.exports = authMiddleware;