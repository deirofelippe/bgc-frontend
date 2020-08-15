import { v1 } from 'uuid';

export const dadosUsuarios = () => {
   return [
      {"id": '123', "nome": "Feh", "email": "feh@gmail.com", "senha":"123", "tipo":"ADMIN",
      "endereco": {
         "cep": "21550400", "estado": "RJ", "cidade": "Rio de Janeiro", "bairro": "Bento Ribeiro", "endereco": "Rua Picuí", "numero": "00",
      },},
      {"id": v1(), "nome": "a", "email": "c@gmail.com", "senha":"123", "tipo":"ADMIN",
      "endereco": {
         "cep": "21550400", "estado": "RJ", "cidade": "Rio de Janeiro", "bairro": "Bento Ribeiro", "endereco": "Rua Picuí", "numero": "00",
      },},
      {"id": v1(), "nome": "a", "email": "d@gmail.com", "senha":"123", "tipo":"ADMIN",
      "endereco": {
         "cep": "21550400", "estado": "RJ", "cidade": "Rio de Janeiro", "bairro": "Bento Ribeiro", "endereco": "Rua Picuí", "numero": "00",
      },},
      {"id": v1(), "nome": "a", "email": "e@gmail.com", "senha":"123", "tipo":"CLIENTE",
      "endereco": {
         "cep": "21550400", "estado": "RJ", "cidade": "Rio de Janeiro", "bairro": "Bento Ribeiro", "endereco": "Rua Picuí", "numero": "00",
      },},
   ]
}

export const dadosReservas = () => {
   return [
      { "idProduto": "1", "idUsuario": "1", "quantidade": "2", "dataReserva": "aa", "numeroReserva": "000" },
      { "idProduto": "3", "idUsuario": "3", "quantidade": "5", "dataReserva": "bb", "numeroReserva": "101" },
      { "idProduto": "4", "idUsuario": "4", "quantidade": "7", "dataReserva": "dd", "numeroReserva": "234" },
      { "idProduto": "1", "idUsuario": "6", "quantidade": "1", "dataReserva": "ab", "numeroReserva": "123" },
      { "idProduto": "2", "idUsuario": "6", "quantidade": "1", "dataReserva": "cd", "numeroReserva": "456" },
      { "idProduto": "1", "idUsuario": "1", "quantidade": "2", "dataReserva": "aa", "numeroReserva": "000" },
      { "idProduto": "3", "idUsuario": "3", "quantidade": "5", "dataReserva": "bb", "numeroReserva": "101" },
      { "idProduto": "4", "idUsuario": "4", "quantidade": "7", "dataReserva": "dd", "numeroReserva": "234" },
      { "idProduto": "1", "idUsuario": "6", "quantidade": "1", "dataReserva": "ab", "numeroReserva": "123" },
      { "idProduto": "2", "idUsuario": "6", "quantidade": "1", "dataReserva": "cd", "numeroReserva": "456" },
   ]
}

export const dadosProdutos = () => {
   let id, produto
   let produtos = []
   for(let indice = 0; indice < 5; indice++){
      id = v1()
      produto = {
         "id": v1(), 
         "imagem":`produto/${id}`, 
         "nome": "PC Gamer", 
         "descricao": "a", 
         "preco": "5000"
      }
      produtos.push(produto)
   }

   return produtos
}