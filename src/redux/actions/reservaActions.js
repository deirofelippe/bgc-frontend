export const adicionar = (dados) => {
   return {
      type: 'ADICIONAR_RESERVA',
      dados
   }
}

export const deletar = (dados) => {
   return {
      type: 'CANCELAR_RESERVA',
      dados
   }
}