// Importando as funções necessárias do Vue Router
import { createRouter, createWebHistory } from 'vue-router'

// Importando as views (páginas) que vamos usar
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'

// Importando o store de autenticação para verificar se o usuário está logado
import { useAuthStore } from '../stores/auth'

// Definindo as rotas da aplicação
const routes = [
    {
    path: '/login', // Rota para a página de login
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false } // Esta rota não requer autenticação
    }
]

// Criando o router com as configurações
const router = createRouter({
  // Usando o modo history para URLs mais limpos (sem #)
    history: createWebHistory(),
    routes
})

// Guard de navegação - executa antes de cada mudança de rota
router.beforeEach((to, from, next) => {
  // Obtendo o store de autenticação
    const authStore = useAuthStore()

  // Verificando se a rota requer autenticação
    if (to.meta.requiresAuth) {
    // Se requer autenticação mas o usuário não está logado
    if (!authStore.isAuthenticated) {
      // Redireciona para a página de login
        next('/login')
    } else {
      // Se está autenticado, permite o acesso
        next()
    }
    } else {
    // Se a rota não requer autenticação, permite o acesso
    next()
    }
})

// Exportando o router para ser usado no main.js
export default router