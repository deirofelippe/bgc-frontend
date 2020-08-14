export const adicionarUsuario = (dados) => {
   return {
      type: 'ADICIONAR_USUARIO',
      dados
   }
}

export const atualizarUsuario = (dados) => {
   return {
      type: 'ATUALIZAR_USUARIO',
      dados
   }
}

export const deletarUsuario = (dados) => {
   return {
      type: 'DELETAR_USUARIO',
      dados
   }
}