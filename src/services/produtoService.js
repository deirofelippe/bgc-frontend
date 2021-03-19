const buscar = (produtos, id) => {
   return produtos.find(produto => produto.id === id)
}

module.exports = {
   buscar,
};