import { dadosUsuarios } from '../../utils/DadosBase'

export default (state = dadosUsuarios(), action) => {
   switch (action.type) {
      case 'ADICIONAR_USUARIO':
         return adicionarUsuario(state, action)

      case 'ATUALIZAR_USUARIO':
         return atualizarUsuario(state, action)

      case 'DELETAR_USUARIO':
         return deletarUsuario(state, action)

      default:
         return state
   }
}

const adicionarUsuario = (state, action) => {
   return [ ...state, action.dados ]
}

const atualizarUsuario = (state, action) => {
   const usuarioNovo = action.dados
   const usuarios = state.map(usuarioAntigo => {
      if (usuarioAntigo.id === usuarioNovo.id) {
         return usuarioNovo
      }
      return usuarioAntigo
   })
   console.log(usuarios)
   return [...usuarios ]
}

const deletarUsuario = (state, action) => {
   const id = action.dados
   const usuarios = state.filter((usuario) => usuario.id !== id)
   return [ ...usuarios ]
}