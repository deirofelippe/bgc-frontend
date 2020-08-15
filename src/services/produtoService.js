export const buscarProduto = (produtos, id) => {
   return produtos.find(produto => produto.id === id)
}

export const validarProduto = (produto) => {
   if(produto.id ){
      return true
   }
   return false
}