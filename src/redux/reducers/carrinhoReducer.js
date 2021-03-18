export default (state = [{id_produto: '1', quantidade: 1}], action) => {
   switch (action.type) {
      case 'ADICIONAR_NO_CARRINHO':
         return adicionar(state, action.dados)

      case 'DELETAR_DO_CARRINHO':
         return deletar(state, action.dados)

      case 'INCREMENTAR_QUANTIDADE':
         return incrementar(state, action.dados)

      case 'DECREMENTAR_QUANTIDADE':
         return decrementar(state, action.dados)

      default:
         return state
   }
}

const adicionar = (carrinho, id_produto) => {
   
   let produto_existe = false
   carrinho = carrinho.map((item) => {
      if(item.id_produto === id_produto){
         produto_existe = true
         item.quantidade += 1
         return item
      }
      return item
   })

   if(!produto_existe){
      const item = { 
         id_produto, 
         quantidade: 1, 
         numero_pedido: 0 
      }

      return [...carrinho, item ]
   }

   return [...carrinho ]
}

const incrementar = (carrinho, id_produto) => {
   carrinho = carrinho.map((item) => {
      if(item.id_produto === id_produto){
         item.quantidade += 1
         return item
      }
      return item
   })

   return [...carrinho ]
}

const decrementar = (carrinho, id_produto) => {
   carrinho = carrinho.map((item) => {
      if(item.id_produto === id_produto && item.quantidade > 1){
         item.quantidade -= 1
         return item
      }
      return item
   })

   return [...carrinho ]
}

const deletar = (carrinho, id_produto) => {
   carrinho = carrinho.filter((id) => id !== id_produto)
   return [ ...carrinho ]
}