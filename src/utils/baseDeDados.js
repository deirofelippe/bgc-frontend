import { v1 } from 'uuid';

export const dados_usuarios = () => {
   return [
      {"id": '123', "nome": "Feh", "email": "seergiio.felippe@gmail.com", "senha":"123", "tipo":"ADMIN",
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

export const dados_reservas = () => {
   return [
      { "idProduto": "1", "idUsuario": "123", "quantidade": "2", "dataReserva": "aa", "numero": "000" },
      { "idProduto": "1", "idUsuario": "123", "quantidade": "5", "dataReserva": "bb", "numero": "101" },
      { "idProduto": "4", "idUsuario": "4", "quantidade": "7", "dataReserva": "dd", "numero": "234" },
      { "idProduto": "1", "idUsuario": "6", "quantidade": "1", "dataReserva": "ab", "numero": "123" },
      { "idProduto": "2", "idUsuario": "6", "quantidade": "1", "dataReserva": "cd", "numero": "456" },
      { "idProduto": "1", "idUsuario": "123", "quantidade": "2", "dataReserva": "aa", "numero": "000" },
      { "idProduto": "3", "idUsuario": "3", "quantidade": "5", "dataReserva": "bb", "numero": "101" },
      { "idProduto": "4", "idUsuario": "4", "quantidade": "7", "dataReserva": "dd", "numero": "234" },
      { "idProduto": "1", "idUsuario": "6", "quantidade": "1", "dataReserva": "ab", "numero": "123" },
      { "idProduto": "2", "idUsuario": "6", "quantidade": "1", "dataReserva": "cd", "numero": "456" },
   ]
}

export const dados_produtos = () => {
   let id, produto
   let produtos = []
   for(let indice = 0; indice < 5; indice++){
      id = v1()
      produto = {
         "id": v1(), 
         "nome": `Teste ${indice}`, 
         "descricao": "a", 
         "preco": "5000"
      }
      produtos.push(produto)
   }

   const produto2 = {
      "id": "1", 
      "nome":`a`, 
      "descricao": "a", 
      "preco": "5000"
   }
   produtos.push(produto2)

   return produtos
}