import { dadosProdutos } from '../../utils/DadosBase'

export default (state = dadosProdutos(), action) => {
   switch (action.type) {
      case 'LISTAR_PRODUTOS':
         return listarProdutos(state)

      case 'ADICIONAR_PRODUTO':
         return adicionarProduto(state, action)

      case 'BUSCAR_PRODUTO':
         return buscarProduto(state, action)

      case 'ATUALIZAR_PRODUTO':
         return atualizarProduto(state, action)

      case 'DELETAR_PRODUTO':
         return deletarProduto(state, action)

      default:
         return state
   }
}

const listarProdutos = (state) => {
   return { ...state.produtos }
}

const adicionarProduto = (state, action) => {
   const produtos = [...state.produtos, action.payload]
   return { produtos }
}

const buscarProduto = (state, action) => {
   const id = action.payload
   const produto = state.produtos.find((produto) => produto.id === id)
   return {
      produto
   }
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
   const produtos = state.produtos.filter((produto) => produto.id !== id)
   return { produtos }
}