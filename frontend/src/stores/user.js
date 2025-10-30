// Importando as funções necessárias do Pinia
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Importando os serviços de autenticação
import authService from '../services/authService'

// Definindo o store de autenticação
export const useAuthStore = defineStore('auth', () => {
    // Estado reativo - dados que podem mudar
    const user = ref(null) // Informações do usuário logado
    const token = ref(localStorage.getItem('token')) // Token de autenticação salvo no navegador
    const loading = ref(false) // Indicador de carregamento
    const error = ref(null) // Mensagens de erro

    // Computed - valores calculados baseados no estado
    const isAuthenticated = computed(() => {
        // Usuário está autenticado se tem token e dados do usuário
        return !!token.value && !!user.value
    })

    // Ações - funções que modificam o estado

    // Função para fazer login com email e senha
    const loginWithPassword = async (email, password) => {
        try {
            loading.value = true // Ativa o indicador de carregamento
            error.value = null // Limpa erros anteriores

    // Chama o serviço de autenticação
    const response = await authService.loginWithPassword(email, password)
    
      // Se o login foi bem-sucedido
    if (response.success) {
        // Salva os dados do usuário e token
        user.value = response.user
        token.value = response.token
        
        // Salva o token no localStorage para persistir entre sessões
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        
        return { success: true }
    }
    
    else {
        // Se houve erro no login
        error.value = response.message
        return { success: false, message: response.message }
    }

    } catch (err) {
    // Se houve erro na requisição
    error.value = 'Erro ao fazer login. Tente novamente.'
    console.error('Erro no login:', err)
    return { success: false, message: 'Erro ao fazer login. Tente novamente.' }
    }
    
    finally {
      loading.value = false // Desativa o indicador de carregamento
    }
    }

// ROTA: POST /api/auth/login
// Faz login com email e senha
router.post('/login', validateLoginData, async (req, res) => {
    try {
        const { email, password } = req.body

        // Tenta autenticar o usuário
        const user = await User.authenticate(email, password)

        if (!user) {
            return res.status(401).json({
                error: 'Credenciais inválidas',
                message: 'Email ou senha incorretos'
            })
        }

        // Gera token JWT
        const token = JWTUtils.generateToken(user)

        res.json({
            success: true,
            message: 'Login realizado com sucesso!',
            user: user,
            token: token
        })

    } catch (error) {
        console.error('Erro no login:', error)
        res.status(500).json({
            error: 'Erro interno',
            message: 'Erro ao fazer login. Tente novamente.'
        })
    }
})


// ROTA: GET /api/auth/verify
// Verifica se o token JWT é válido
router.get('/verify', JWTUtils.authenticateToken, (req, res) => {
    try {
        // Se chegou até aqui, o token é válido (middleware já verificou)
        const userId = req.user.id

        // Busca dados atualizados do usuário
        const user = User.findById(userId)

        if (!user) {
            return res.status(404).json({
                error: 'Usuário não encontrado',
                message: 'O usuário associado ao token não existe mais'
            })
        }

        res.json({
            success: true,
            message: 'Token válido',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    }

    catch (error) {
        console.error('Erro na verificação:', error)
        res.status(500).json({
            error: 'Erro interno',
            message: 'Erro ao verificar token'
        })
    }
})

// ROTA: POST /api/auth/refresh
// Renova o token JWT
router.post('/refresh', (req, res) => {
    try {
        const token = JWTUtils.extractToken(req)

    if (!token) {
        return res.status(401).json({
            error: 'Token não fornecido',
            message: 'Token é necessário para renovação'
        })
    }

    const result = JWTUtils.refreshToken(token)

    if (!result.success) {
        return res.status(401).json({
            error: 'Token inválido',
            message: result.error
        })
    }

    res.json({
        success: true,
        message: 'Token renovado com sucesso',
        token: result.token
    })
    }
    
    catch (error) {
        console.error('Erro na renovação:', error)
        res.status(500).json({
            error: 'Erro interno',
            message: 'Erro ao renovar token'
        })
    }
})

// ROTA: GET /api/auth/users
// Lista todos os usuários (apenas para desenvolvimento)
router.get('/users', (req, res) => {
    try {
        const users = User.getAll()
    
        res.json({
            success: true,
            message: `${users.length} usuário(s) encontrado(s)`,
            users: users,
            total: users.length
        })
    } 

    catch (error) {
        console.error('Erro ao listar usuários:', error)
        res.status(500).json({
            error: 'Erro interno',
            message: 'Erro ao listar usuários'
        })
    }
})

// ROTA: DELETE /api/auth/users/:id
// Remove um usuário (apenas para desenvolvimento)
router.delete('/users/:id', JWTUtils.authenticateToken, (req, res) => {
    try {
        const userId = parseInt(req.params.id)
        const currentUserId = req.user.id

    // Usuário só pode deletar a própria conta
        if (userId !== currentUserId) {
            return res.status(403).json({
                error: 'Acesso negado',
                message: 'Você só pode deletar sua própria conta'
            })
        }

        const deleted = User.delete(userId)

        if (!deleted) {
            return res.status(404).json({
                error: 'Usuário não encontrado',
                message: 'O usuário especificado não existe'
            })
        }

        res.json({
            success: true,
            message: 'Conta deletada com sucesso'
        })
    } 
    
    catch (error) {
        console.error('Erro ao deletar usuário:', error)
        res.status(500).json({
            error: 'Erro interno',
            message: 'Erro ao deletar usuário'
        })
    }
})

module.exports = router
})