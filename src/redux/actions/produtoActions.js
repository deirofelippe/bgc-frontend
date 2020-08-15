export const adicionarProduto = (dados) => {
   return {
      type: 'ADICIONAR_PRODUTO',
      dados
   }
}

export const atualizarProduto = (dados) => {
   return {
      type: 'ATUALIZAR_PRODUTO',
      dados
   }
}

export const deletarProduto = (dados) => {
   return {
      type: 'DELETAR_PRODUTO',
      dados
   }
}