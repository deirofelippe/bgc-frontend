export default (state = [{id_produto: '1', quantidade: 1, id_usuario: '123'}], action) => {
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

const adicionar = (carrinho, ids) => {
   let produto_existe = false
   carrinho = carrinho.map((item) => {
      if((item.id_produto === ids.id_produto) && (item.id_usuario === ids.id_usuario)){
         produto_existe = true
         item.quantidade += 1
         return item
      }
      return item
   })

   if(!produto_existe){
      const item = { 
         id_produto: ids.id_produto, 
         id_usuario: ids.id_usuario, 
         quantidade: 1, 
         numero_pedido: 0 
      }

      return [...carrinho, item ]
   }

   return [...carrinho ]
}

const incrementar = (carrinho, ids) => {
   carrinho = carrinho.map((item) => {
      if((item.id_produto === ids.id_produto) && (item.id_usuario === ids.id_usuario)){
         item.quantidade += 1
         return item
      }
      return item
   })

   return [...carrinho ]
}

const decrementar = (carrinho, ids) => {
   carrinho = carrinho.map((item) => {
      if((item.id_produto === ids.id_produto) && (item.quantidade > 1)
         && (item.id_usuario === ids.id_usuario)){
         item.quantidade -= 1
         return item
      }
      return item
   })

   return [...carrinho ]
}

const deletar = (carrinho, ids) => {
   carrinho = carrinho.filter((item) => ((item.id_produto !== ids.id_produto) && (item.id_usuario === ids.id_usuario)))
   return [ ...carrinho ]
}