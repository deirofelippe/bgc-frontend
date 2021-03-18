export default (state = [], action) => {
   switch (action.type) {
      case 'FINALIZAR_RESERVA':
         return finalizar(state, action.dados)

      default:
         return state
   }
}

const finalizar = (reservas, reserva) => {
   //gera numero do pedido e o pedido
   const id_usuario = reserva.id_usuario
   const numero_pedido = reserva.numero_pedido
   // const carrinho = reserva.carrinho
   let carrinho = reserva.carrinho

   carrinho = [
      {id_produto: '1', quantidade: 5, id_usuario: '123'},
      {id_produto: '1', quantidade: 5, id_usuario: '23'},
      {id_produto: '1', quantidade: 5, id_usuario: '123'},
      {id_produto: '1', quantidade: 2, id_usuario: '456'}
   ]

   reserva = carrinho.filter((item) => (item.id_usuario === id_usuario))

   reserva = reserva.map((item) => {
      return {
         id_produto: item.id_produto,
         quantidade: item.quantidade,
         numero_pedido
      }
   })

   console.log(reserva)

   return [...reservas, ...reserva ]
}