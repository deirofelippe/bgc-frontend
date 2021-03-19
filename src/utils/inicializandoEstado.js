export const iniciar_estado_login = () => {
   return {
      logado: false,
      id: '',
      email: '',
      nome: '',
      tipo_de_usuario: ''
   }
}

export const iniciar_estado_produto = () => {
   return {
      id: '',
      nome: '',
      descricao: '',
      preco: '',
   }
}

export const iniciar_estado_usuario = () => {
   return {
      id: '',
      nome: '',
      email: '',
      senha: '',
      tipo: 'CLIENTE',
      endereco: {
         cep: '',
         estado: '',
         cidade: '',
         bairro: '',
         endereco: '',
         numero: '',
      }
   }
}

export const iniciar_estado_reserva = () => {
   return {
      numero_pedido: '', 
      id_produto: '', 
      quantidade: '1'
   }
}

export const iniciar_estado_pedido = () => {
   return {
      id_usuario: '', 
      data_reserva: '', 
      numero_pedido: ''
   }
}