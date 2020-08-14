import { iniciarEstadoLogin } from '../../utils/iniciarEstado'

export default (state = iniciarEstadoLogin(), action) => {
   switch (action.type) {
      case 'FAZER_LOGIN':
         return fazerLogin(state, action)

      case 'FAZER_LOGOUT':
         return fazerLogout(state)

      default:
         return state
   }
}

const fazerLogin = (state, action) => {
   const login = action.dados.login
   const usuarios = action.dados.usuarios
   const usuario = usuarios.find(usuario => {
      if((login.email === usuario.email) && (login.senha === usuario.senha)){
         return usuario
      }
      return {}
   })

   if(usuario.email === '' || usuario.email === undefined){
      return { ...state } 
   }

   const usuarioLogado = {
      logado: true,
      email: usuario.email,
      nome: usuario.nome,
      tipoDeUsuario: usuario.tipo
   }
   return { ...state, ...usuarioLogado }
}

const fazerLogout = (state) => {
   const logout = iniciarEstadoLogin()
   return { ...state, ...logout }
}