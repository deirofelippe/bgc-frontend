import { dados_reservas } from '../../utils/baseDeDados'

export default (state = dados_reservas(), action) => {
   switch (action.type) {
      case 'FINALIZAR_RESERVA':
         return finalizar(state, action.dados)

      default:
         return state
   }
}

const finalizar = (state, reserva) => {
   const id_usuario = reserva.id_usuario
   const numero_pedido = reserva.numero_pedido
   const carrinho = reserva.carrinho

   reserva = carrinho.filter((item) => (item.id_usuario === id_usuario))

   reserva = reserva.map((item) => {
      return {
         id_produto: item.id_produto,
         quantidade: item.quantidade,
         numero_pedido
      }
   })

   return [...state, ...reserva ]
}