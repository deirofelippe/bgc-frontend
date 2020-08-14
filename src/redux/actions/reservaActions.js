export const adicionarReserva = (dados) => {
   return {
      type: 'ADICIONAR_RESERVA',
      dados
   }
}

export const deletarReserva = (dados) => {
   return {
      type: 'CANCELAR_RESERVA',
      dados
   }
}