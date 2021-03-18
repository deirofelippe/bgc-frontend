export const adicionar = (dados) => {
   return {
      type: 'ADICIONAR_NO_CARRINHO',
      dados
   }
}

export const deletar = (dados) => {
   return {
      type: 'DELETAR_DO_CARRINHO',
      dados
   }
}

export const incrementar = (dados) => {
   return {
      type: 'INCREMENTAR_QUANTIDADE',
      dados
   }
}

export const decrementar = (dados) => {
   return {
      type: 'DECREMENTAR_QUANTIDADE',
      dados
   }
}