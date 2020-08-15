import { dadosProdutos } from '../../utils/DadosBase'

export default (state = dadosProdutos(), action) => {
   switch (action.type) {
      case 'ADICIONAR_PRODUTO':
         return adicionarProduto(state, action)

      case 'ATUALIZAR_PRODUTO':
         return atualizarProduto(state, action)

      case 'DELETAR_PRODUTO':
         return deletarProduto(state, action)

      default:
         return state
   }
}

const adicionarProduto = (state, action) => {
   return [...state, action.dados ]
}

const atualizarProduto = (state, action) => {
   const produtoNovo = action.dados
   const produtos = state.map(produtoAntigo => {
      if (produtoAntigo.id === produtoNovo.id) {
         return produtoNovo
      }
      return produtoAntigo
   })
   return [...produtos]
}

const deletarProduto = (state, action) => {
   const id = action.dados
   const produtos = state.filter((produto) => produto.id !== id)
   return [ ...produtos ]
}