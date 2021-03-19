import { dados_usuarios } from '../../utils/baseDeDados'

export default (state = dados_usuarios(), action) => {
   switch (action.type) {
      case 'ADICIONAR_USUARIO':
         return adicionar(state, action.dados)

      case 'ATUALIZAR_USUARIO':
         return atualizar(state, action.dados)

      case 'DELETAR_USUARIO':
         return deletar(state, action.dados)

      default:
         return state
   }
}

const adicionar = (state, usuario) => {
   return [ ...state, usuario ]
}

const atualizar = (state, usuarioNovo) => {
   state = state.map(usuarioAntigo => {
      if (usuarioAntigo.id === usuarioNovo.id) {
         return usuarioNovo
      }
      return usuarioAntigo
   })
   return [ ...state ]
}

const deletar = (state, id) => {
   state = state.filter((usuario) => usuario.id !== id)
   return [ ...state ]
}