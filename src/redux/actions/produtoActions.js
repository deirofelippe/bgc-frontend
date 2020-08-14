export const listarProdutos = () => {
   return {
      type: 'LISTAR_PRODUTOS'
   }
}

export const adicionarProduto = (data) => {
   return {
      type: 'ADICIONAR_PRODUTO',
      payload: data
   }
}

export const buscarProduto = (data) => {
   return {
      type: 'BUSCAR_PRODUTO',
      payload: data
   }
}

export const atualizarProduto = (data) => {
   return {
      type: 'ATUALIZAR_PRODUTO',
      payload: data
   }
}

export const deletarProduto = (data) => {
   return {
      type: 'DELETAR_PRODUTO',
      payload: data
   }
}