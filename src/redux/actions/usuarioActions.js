export const adicionar = (dados) => {
   return {
      type: 'ADICIONAR_USUARIO',
      dados
   }
}

export const atualizar = (dados) => {
   return {
      type: 'ATUALIZAR_USUARIO',
      dados
   }
}

export const deletar = (dados) => {
   return {
      type: 'DELETAR_USUARIO',
      dados
   }
}