import axios from 'axios'

export const enviar_email = async (pedido, reservas, produtos, usuario) => {
   produtos = reservas.map(reserva => {
      const produto = produtos.find(produto => produto.id === reserva.id_produto)

      return {
         nome: produto.nome,
         descricao: produto.descricao,
         preco: produto.preco,
         quantidade: reserva.quantidade
      }
   })

   const pedido_enviar = {
      numero_pedido: pedido.numero_pedido,
      total: pedido.total,
      data_pedido: pedido.data_pedido,
      usuario: {
         nome: usuario.nome,
         email: usuario.email
      },
      reservas: [
         ...produtos
      ]
   }

   console.log(pedido_enviar)
   console.log(process.env.REACT_APP_URL_POST_PEDIDO)
   const response = await axios.post(process.env.REACT_APP_URL_POST_PEDIDO, {
      pedido: pedido_enviar
   });
   console.log(response)

   return response.data.url_payment
}

export const preparar_reservas = (carrinho, id_usuario, numero_pedido) => {
   const reserva = carrinho.filter((item) => (item.id_usuario === id_usuario))

   return reserva.map((item) => {
      return {
         id_produto: item.id_produto,
         quantidade: item.quantidade,
         numero_pedido
      }
   })
}

export const preparar_pedido = (pedido) => {
   return {
      ...pedido,
      data_pedido: Date.now()
   }
}