const User = require('../models/User')
const jwt = require('jsonwebtoken')

// 🧾 Cadastrar novo usuário
const cadastrarUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
      return res.status(400).json({ mensagem: 'Nome, e-mail e senha são obrigatórios' })
    }

    // Verifica se já existe user com esse e-mail
    const existente = await User.findOne({ email })
    if (existente) {
      return res.status(400).json({ mensagem: 'Já existe um usuário com esse e-mail' })
    }

    // Gera código sequencial automaticamente
    const ultimo = await User.findOne().sort('-codigo')
    const codigo = ultimo ? ultimo.codigo + 1 : 1

    const novoUser = new User({
      codigo,
      nome,
      email,
      senha,
      status: 'usuario'
    })


    await novoUser.save()

    res.status(201).json({
      mensagem: 'Usuário cadastrado com êxito',
      user: {
        id: novoUser._id,
        codigo: novoUser.codigo,
        nome: novoUser.nome,
        email: novoUser.email,
        status: novoUser.status
      }
    })
  } catch (err) {
    console.error(' Erro ao cadastrar Usuário:', err)
    res.status(500).json({ mensagem: 'Erro ao cadastrar usuário', erro: err.message })
  }
}

// 🔐 Login do user (corrigido)
const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios' })
    }

    const User = await User.findOne({ email })
    if (!User) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' })
    }

    const senhaValida = await User.compararSenha(senha)
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Senha inválida' })
    }

    // Gera token JWT com payload básico
    const token = jwt.sign(
      {
        id: User._id,
        codigo: user.codigo,
        nome: user.nome,
        email: user.email,
        status: user.status
      },
      process.env.JWT_SECRET || 'segredo',
      { expiresIn: '24h' }
    )

    // 🔹 Agora retorna também os dados do user
    res.status(200).json({
      mensagem: 'Login realizado com sucesso',
      token,
      user: {
        id: user._id,
        codigo: user.codigo,
        nome: user.nome,
        email: user.email,
        status: user.status
      }
    })
  } catch (err) {
    console.error('❌ Erro no login:', err)
    res.status(500).json({ mensagem: 'Erro ao realizar login', erro: err.message })
  }
}


// 📋 Listar todos os users (apenas admin)
const listarusers = async (req, res) => {
  try {
    const users = await user.find().select('-senha').sort({ codigo: 1 })
    res.status(200).json({ users })
  } catch (err) {
    console.error('❌ Erro ao listar users:', err)
    res.status(500).json({ mensagem: 'Erro ao listar users', erro: err.message })
  }
}

module.exports = {
  cadastraruser,
  loginuser,
  listarusers
}
