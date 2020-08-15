import { iniciarEstadoLogin } from '../../utils/inicializandoEstado'
const iniciar = () => {
   const inicio = {
      logado: true,
      id: 'ae1cd970-de8e-11ea-8801-d906a2b35bfc',
      email: 'feh@gmail.com',
      nome: 'Feh',
      tipoDeUsuario: 'ADMIN'
   }
   return inicio
}

export default (state = iniciar(), action) => {
   switch (action.type) {
      case 'FAZER_LOGIN':
         return fazerLogin(state, action)

      case 'FAZER_LOGIN_DIRETO':
         return fazerLoginDireto(state, action)

      case 'FAZER_LOGOUT':
         return fazerLogout(state)

      default:
         return state
   }
}

const fazerLogin = (state, action) => {
   const login = action.dados.login
   const usuarios = action.dados.usuarios
   console.log(usuarios)
   const usuario = usuarios.find(usuario => {
      if ((login.email === usuario.email) && (login.senha === usuario.senha)) {
         return usuario
      }
      return undefined
   })

   if (usuario === undefined) {
      return { ...state }
   }

   const usuarioLogado = {
      logado: true,
      id: usuario.id,
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

const fazerLoginDireto = (state, action) => {
   const login = action.dados
   return { ...state, ...login }
}