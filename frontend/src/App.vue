<template>
    <!-- Container principal da tela de login -->
    <div class="login-container">
        <!-- Card do formulário de login -->
    <div class="login-card">
        <!-- Título da página -->
        <h1 class="login-title">Entrar na sua conta</h1>

        <!-- Mensagem de erro, se houver -->
        <div v-if="authStore.error" class="error-message">
        {{ authStore.error }}
    </div>

    <!-- Formulário de login tradicional -->
    <form @submit.prevent="handleLogin" class="login-form">
        <!-- Campo de email -->
        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email"
            v-model="email" 
            required 
            class="form-input"
          />
        </div>
        
        <!-- Campo de senha -->
        <div class="form-group">
          <label for="password">Senha:</label>
          <input 
            type="password" 
            id="password"
            v-model="password" 
            required
            class="form-input"
          />
        </div>
        
        <!-- Botão de login -->
        <button 
          type="submit" 
          :disabled="authStore.loading"
          class="login-btn"
        >
          <!-- Mostra "Carregando..." quando está fazendo login -->
          {{ authStore.loading ? 'Carregando...' : 'Entrar' }}
        </button>
      </form>
</template>

<script>
// Importando as funções necessárias do Vue
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Importando o store de autenticação
import { useAuthStore } from '../stores/auth'

export default {
  name: 'LoginView',
  setup() {
    // Obtendo o router para navegação
    const router = useRouter()
    
    // Obtendo o store de autenticação
    const authStore = useAuthStore()
    
    // Variáveis reativas para os formulários
    const email = ref('') // Email do login
    const password = ref('') // Senha do login
    const name = ref('') // Nome para registro
    const registerEmail = ref('') // Email para registro
    const registerPassword = ref('') // Senha para registro
    const showRegisterForm = ref(false) // Controla se mostra o formulário de registro
    
    // Função para fazer login tradicional
    const handleLogin = async () => {
      // Chama a função de login do store
      const result = await authStore.loginWithPassword(email.value, password.value)
      
      // Se o login foi bem-sucedido
      if (result.success) {
        // Redireciona para a página inicial
        router.push('/')
      }
      // Se houve erro, a mensagem já é mostrada pelo store
    }
    
    // Retorna as variáveis e funções para serem usadas no template
    return {
      authStore,
      email,
      password,
      name,
      registerEmail,
      registerPassword,
      showRegisterForm,
      handleLogin,
      handleGoogleLogin,
      handleRegister
    }
  }
}
</script>

<style scoped>
/* Estilos CSS para a tela de login */

/* Container principal - centraliza o conteúdo */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

/* Card do formulário */
.login-card {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

/* Título principal */
.login-title {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
}

/* Mensagem de erro */
.error-message {
  background: #fee;
  color: #c33;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid #fcc;
}

/* Formulários */
.login-form,
.register-form {
  margin-bottom: 20px;
}

.register-form {
  border-top: 1px solid #eee;
  padding-top: 20px;
  margin-top: 20px;
}

.register-form h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 20px;
}

/* Grupos de campos */
.form-group {
  margin-bottom: 20px;
}

/* Labels */
.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
}

/* Campos de input */
.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

/* Botões */
.login-btn,
.register-btn {
  width: 100%;
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.login-btn:hover,
.register-btn:hover {
  background: #5a6fd8;
}

.login-btn:disabled,
.register-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Responsividade para telas menores */
@media (max-width: 480px) {
  .login-card {
    padding: 20px;
  }
  
  .login-title {
    font-size: 20px;
  }
}
</style>