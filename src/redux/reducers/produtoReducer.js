import { dados_produtos } from '../../utils/baseDeDados'

export default (state = dados_produtos(), action) => {
   switch (action.type) {
      case 'ADICIONAR_PRODUTO':
         return adicionar(state, action.dados)

      case 'ATUALIZAR_PRODUTO':
         return atualizar(state, action.dados)

      case 'DELETAR_PRODUTO':
         return deletar(state, action.dados)

      default:
         return state
   }
}

const adicionar = (produtos, produto) => {
   return [...produtos, produto ]
}

const atualizar = (produtos, produtoNovo) => {
   produtos = produtos.map(produtoAntigo => {
      if (produtoAntigo.id === produtoNovo.id) {
         return produtoNovo
      }
      return produtoAntigo
   })
   return [ ...produtos ]
}

const deletar = (produtos, id) => {
   produtos = produtos.filter((produto) => produto.id !== id)
   return [ ...produtos ]
}