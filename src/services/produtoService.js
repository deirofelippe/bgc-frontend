export const buscarProduto = (produtos, id) => {
   return produtos.find(produto => produto.id === id)
}