const express = require('express')
const router = express.Router()
const produtoController = require('../controllers/produtoController')
const autenticarToken = require('../middleware/auth')
const verificarAdmin = require('../middleware/adminauth')

router.get('/', produtoController.listarProdutos)

router.get('/:id', produtoController.buscarProduto) 

router.post('/cadastrar', autenticarToken, verificarAdmin, produtoController.cadastrarProduto)
router.put('/:id', autenticarToken, verificarAdmin, produtoController.atualizarProduto)
router.patch('/:id/status', autenticarToken, verificarAdmin, produtoController.atualizarStatusProduto)
router.delete('/:id', autenticarToken, verificarAdmin, produtoController.excluirProduto)

module.exports = router
