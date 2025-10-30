// Importando as funções necessárias do Vue
import { createApp } from 'vue'

// Importando o componente principal da aplicação
import App from './App.vue'

// Importando o router (sistema de navegação)
import router from './router'

// Importando o Pinia (gerenciador de estado)
import { createPinia } from 'pinia'

// Importando o store de autenticação
import { useAuthStore } from './stores/auth'

// Importando os estilos globais
import './style.css'

// Criando a instância do Pinia
const pinia = createPinia()

// Criando a aplicação Vue
const app = createApp(App)

// Registrando o Pinia na aplicação
app.use(pinia)

// Registrando o Router na aplicação
app.use(router)

// Montando a aplicação no elemento com id "app"
app.mount('#app')

// Restaurando a sessão do usuário (se existir)
// Isso é importante para manter o usuário logado quando ele recarrega a página
const authStore = useAuthStore()