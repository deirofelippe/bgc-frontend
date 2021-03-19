import { iniciar_estado_login } from '../../utils/inicializandoEstado'
import { buscar_usuario_por_email } from '../../services/usuarioService'
const login = {
   logado: true,
   id: '123',
   email: 'feh@gmail.com',
   nome: 'Feh',
   tipoDeUsuario: 'ADMIN'
}

// export default (state = iniciar_estado_login(), action) => {
export default (state = login, action) => {
   switch (action.type) {
      case 'FAZER_LOGIN':
         return fazer_login(state, action.dados)

      case 'FAZER_LOGIN_DIRETO':
         return fazer_login_direto(state, action.dados)

      case 'FAZER_LOGOUT':
         return fazer_logout(state)

      default:
         return state
   }
}

const fazer_login = (state, dados) => {
   const { usuarios, login } = dados

   const usuario = buscar_usuario_por_email(usuarios, login.email)

   const usuarioLogado = {
         logado: true,
         id: usuario.id,
         email: usuario.email,
         nome: usuario.nome,
         tipoDeUsuario: usuario.tipo
   }

   return { ...state, ...usuarioLogado }
}

const fazer_logout = (state) => {
   const logout = iniciar_estado_login()
   return { ...state, ...logout }
}

const fazer_login_direto = (state, login) => {
   return { ...state, ...login }
}