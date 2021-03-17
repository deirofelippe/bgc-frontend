export const adicionar = (dados) => {
   return {
      type: 'ADICIONAR_PRODUTO',
      dados
   }
}

export const atualizar = (dados) => {
   return {
      type: 'ATUALIZAR_PRODUTO',
      dados
   }
}

export const deletar = (dados) => {
   return {
      type: 'DELETAR_PRODUTO',
      dados
   }
}