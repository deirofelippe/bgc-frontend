export default (state = [], action) => {
   switch (action.type) {
      case 'ADICIONAR_PEDIDO':
         return adicionar(state, action.dados)

      default:
         return state
   }
}

const adicionar = (state, pedido) => {
   pedido.data_pedido = Date.now()
   return [...state, pedido ]
}
