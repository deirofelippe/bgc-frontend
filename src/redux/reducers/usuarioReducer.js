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

const adicionar = (usuarios, usuario) => {
   return [ ...usuarios, usuario ]
}

const atualizar = (usuarios, usuarioNovo) => {
   usuarios = usuarios.map(usuarioAntigo => {
      if (usuarioAntigo.id === usuarioNovo.id) {
         return usuarioNovo
      }
      return usuarioAntigo
   })
   return [ ...usuarios ]
}

const deletar = (usuarios, id) => {
   usuarios = usuarios.filter((usuario) => usuario.id !== id)
   return [ ...usuarios ]
}