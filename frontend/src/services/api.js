// Importando axios para fazer requisições HTTP
import axios from 'axios'

// Configuração da URL base da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Criando uma instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use((config) => {
  // Pega o token do localStorage
  const token = localStorage.getItem('token')
  
  // Se existe token, adiciona no cabeçalho Authorization
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config
})

// Serviço de autenticação
const authService = {
  // Função para fazer login com email e senha
  async loginWithPassword(email, password) {
    try {
      // Faz a requisição POST para a API
      const response = await api.post('/auth/login', {
        email,
        password
      })
      
      // Retorna os dados da resposta
      return {
        success: true,
        user: response.data.user,
        token: response.data.token
      }
    } catch (error) {
      // Se houve erro na requisição
      console.error('Erro no login:', error)
      
      // Verifica se é erro de resposta da API
      if (error.response && error.response.data) {
        return {
          success: false,
          message: error.response.data.message || 'Erro ao fazer login'
        }
      }
      
      // Erro genérico
      return {
        success: false,
        message: 'Erro de conexão. Verifique sua internet.'
      }
    }
  },

  // Função para fazer login com Google
  async loginWithGoogle(googleToken) {
    try {
      // Faz a requisição POST para a API com o token do Google
      const response = await api.post('/auth/google', {
        token: googleToken
      })
      
      return {
        success: true,
        user: response.data.user,
        token: response.data.token
      }
    } catch (error) {
      console.error('Erro no login com Google:', error)
      
      if (error.response && error.response.data) {
        return {
          success: false,
          message: error.response.data.message || 'Erro ao fazer login com Google'
        }
      }
      
      return {
        success: false,
        message: 'Erro de conexão. Verifique sua internet.'
      }
    }
  },

  // Função para verificar se o token ainda é válido
  async verifyToken() {
    try {
      const response = await api.get('/auth/verify')
      
      return {
        success: true,
        user: response.data.user
      }
    } catch (error) {
      console.error('Erro ao verificar token:', error)
      
      return {
        success: false,
        message: 'Token inválido'
      }
    }
  }
}

// Exporta o serviço para ser usado em outros arquivos
export default authService