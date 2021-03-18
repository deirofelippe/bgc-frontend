import { dados_pedidos } from '../../utils/baseDeDados'

export default (state = dados_pedidos(), action) => {
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
