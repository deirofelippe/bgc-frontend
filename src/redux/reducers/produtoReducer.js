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
   // console.log(state)
   return [...state, action.payload ]
}

const atualizarProduto = (state, action) => {
   const produtoNovo = action.payload
   const produtos = state.produtos.map(produtoAntigo => {
      if (produtoAntigo.id === produtoNovo.id) {
         return produtoNovo
      }
      return produtoAntigo
   })
   return { produtos }
}

const deletarProduto = (state, action) => {
   const id = action.payload
   const produtos = state.filter((produto) => produto.id !== id)
   return [ ...produtos ]
}