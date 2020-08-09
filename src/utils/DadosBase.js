const pegarDados = () => {
   return {
      produtos: [
         { "id": "1", "nome": "Notebook", "descricao": "a", "preco": "5000", },
         { "id": "2", "nome": "Videogame", "descricao": "b", "preco": "6000", },
         { "id": "3", "nome": "Monitor", "descricao": "c", "preco": "3000", },
         { "id": "4", "nome": "Meri", "descricao": "d", "preco": "2000", },
         { "id": "5", "nome": "Meri", "descricao": "d", "preco": "2000", },
      ],
      reservas: [
         { "idProduto":"1", "idUsuario":"1", "quantidade":"2", "dataReserva":"aa", "numeroReserva":"000"},
         { "idProduto":"3", "idUsuario":"3", "quantidade":"5", "dataReserva":"bb", "numeroReserva":"101"},
         { "idProduto":"4", "idUsuario":"4", "quantidade":"7", "dataReserva":"dd", "numeroReserva":"234"},
         { "idProduto":"1", "idUsuario":"6", "quantidade":"1", "dataReserva":"ab", "numeroReserva":"123"},
         { "idProduto":"2", "idUsuario":"6", "quantidade":"1", "dataReserva":"cd", "numeroReserva":"456"},
      ],
      usuario: [
         { "id":"1", "nome":"a", "email":"a@gmail.com", "cep":"11111-111", "endereco":"a", },
         { "id":"2", "nome":"a", "email":"a@gmail.com", "cep":"11111-111", "endereco":"a", },
         { "id":"3", "nome":"a", "email":"a@gmail.com", "cep":"11111-111", "endereco":"a", },
         { "id":"4", "nome":"a", "email":"a@gmail.com", "cep":"11111-111", "endereco":"a", },
         { "id":"5", "nome":"a", "email":"a@gmail.com", "cep":"11111-111", "endereco":"a", },
         { "id":"6", "nome":"Feh", "email":"a@gmail.com", "cep":"666666-666", "endereco":"a", },
      ]
   }
}
export default pegarDados;