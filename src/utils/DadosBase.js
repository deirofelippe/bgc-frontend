const pegarDados = () => {
   return {
      produtos: [
         { "nome": "PC Gamer", "descricao": "a", "preco": "5000", },
         { "nome": "Videogame", "descricao": "b", "preco": "6000", },
         { "nome": "Monitor", "descricao": "c", "preco": "3000", },
         { "nome": "Meri", "descricao": "d", "preco": "2000", },
         { "nome": "a", "descricao": "d", "preco": "s", },
      ],
      reservas: [
         { "idProduto":"1", "idUsuario":"1", "quantidade":"2", "dataReserva":"aa", "numeroReserva":"000"},
         { "idProduto":"3", "idUsuario":"3", "quantidade":"5", "dataReserva":"bb", "numeroReserva":"101"},
         { "idProduto":"4", "idUsuario":"4", "quantidade":"7", "dataReserva":"dd", "numeroReserva":"234"},
         { "idProduto":"1", "idUsuario":"6", "quantidade":"1", "dataReserva":"ab", "numeroReserva":"123"},
         { "idProduto":"2", "idUsuario":"6", "quantidade":"1", "dataReserva":"cd", "numeroReserva":"456"},
      ],
      usuario: [
         { "nome":"a", "email":"a@gmail.com", "cep":"11111-111", "endereco":"a", },
         { "nome":"a", "email":"a@gmail.com", "cep":"11111-111", "endereco":"a", },
         { "nome":"a", "email":"a@gmail.com", "cep":"11111-111", "endereco":"a", },
         { "nome":"a", "email":"a@gmail.com", "cep":"11111-111", "endereco":"a", },
         { "nome":"a", "email":"a@gmail.com", "cep":"11111-111", "endereco":"a", },
         { "nome":"Feh", "email":"a@gmail.com", "cep":"666666-666", "endereco":"a", },
      ]
   }
}
export default pegarDados;