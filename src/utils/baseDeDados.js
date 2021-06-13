import { v1 } from 'uuid';

export const dados_usuarios = () => {
   return [
      {"id": '123', "nome": "Feh", "email": "f@gmail.com", "senha":"123", "tipo_de_usuario":"ADMIN",
      "endereco": {
         "cep": "21550400", "estado": "RJ", "cidade": "Rio de Janeiro", "bairro": "Bento Ribeiro", "endereco": "Rua Picuí", "numero": "00",
      },},
      {"id": v1(), "nome": "a", "email": "c@gmail.com", "senha":"123", "tipo_de_usuario":"ADMIN",
      "endereco": {
         "cep": "21550400", "estado": "RJ", "cidade": "Rio de Janeiro", "bairro": "Bento Ribeiro", "endereco": "Rua Picuí", "numero": "00",
      },},
      {"id": v1(), "nome": "a", "email": "d@gmail.com", "senha":"123", "tipo_de_usuario":"ADMIN",
      "endereco": {
         "cep": "21550400", "estado": "RJ", "cidade": "Rio de Janeiro", "bairro": "Bento Ribeiro", "endereco": "Rua Picuí", "numero": "00",
      },},
      {"id": v1(), "nome": "a", "email": "e@gmail.com", "senha":"123", "tipo_de_usuario":"CLIENTE",
      "endereco": {
         "cep": "21550400", "estado": "RJ", "cidade": "Rio de Janeiro", "bairro": "Bento Ribeiro", "endereco": "Rua Picuí", "numero": "00",
      },},
   ]
}

export const dados_reservas = () => {
   return [
      {
        "id_produto": "1",
        "quantidade": 5,
        "numero_pedido": "c8f5eb80-87f1-11eb-9647-b7c27af6831e"
      },
      {
        "id_produto": "eba482a1-87f0-11eb-b154-453384dad18e",
        "quantidade": 1,
        "numero_pedido": "d1901180-87f1-11eb-9647-b7c27af6831e"
      },
      {
        "id_produto": "eba482a3-87f0-11eb-b154-453384dad18e",
        "quantidade": 1,
        "numero_pedido": "d1901180-87f1-11eb-9647-b7c27af6831e"
      },
      {
        "id_produto": "eba482a5-87f0-11eb-b154-453384dad18e",
        "quantidade": 1,
        "numero_pedido": "d1901180-87f1-11eb-9647-b7c27af6831e"
      },
      {
        "id_produto": "eba482a7-87f0-11eb-b154-453384dad18e",
        "quantidade": 1,
        "numero_pedido": "d1901180-87f1-11eb-9647-b7c27af6831e"
      },
      {
        "id_produto": "eba482a9-87f0-11eb-b154-453384dad18e",
        "quantidade": 1,
        "numero_pedido": "d1901180-87f1-11eb-9647-b7c27af6831e"
      },
      {
        "id_produto": "1",
        "quantidade": 2,
        "numero_pedido": "d1901180-87f1-11eb-9647-b7c27af6831e"
      },
      {
        "id_produto": "eba482a1-87f0-11eb-b154-453384dad18e",
        "quantidade": 2,
        "numero_pedido": "d7ad2990-87f1-11eb-9647-b7c27af6831e"
      },
      {
        "id_produto": "eba482a3-87f0-11eb-b154-453384dad18e",
        "quantidade": 4,
        "numero_pedido": "d7ad2990-87f1-11eb-9647-b7c27af6831e"
      },
      {
        "id_produto": "eba482a9-87f0-11eb-b154-453384dad18e",
        "quantidade": 6,
        "numero_pedido": "d7ad2990-87f1-11eb-9647-b7c27af6831e"
      },
      {
        "id_produto": "eba482a1-87f0-11eb-b154-453384dad18e",
        "quantidade": 1,
        "numero_pedido": "de3e8740-87f1-11eb-9647-b7c27af6831e"
      },
      {
        "id_produto": "eba482a9-87f0-11eb-b154-453384dad18e",
        "quantidade": 3,
        "numero_pedido": "de3e8740-87f1-11eb-9647-b7c27af6831e"
      },
      {
        "id_produto": "eba482a5-87f0-11eb-b154-453384dad18e",
        "quantidade": 2,
        "numero_pedido": "de3e8740-87f1-11eb-9647-b7c27af6831e"
      },
      {
        "id_produto": "eba482a3-87f0-11eb-b154-453384dad18e",
        "quantidade": 1,
        "numero_pedido": "de3e8740-87f1-11eb-9647-b7c27af6831e"
      }
    ]
}

export const dados_pedidos = () => {
   return [
      {
        "numero_pedido": "c8f5eb80-87f1-11eb-9647-b7c27af6831e",
        "id_usuario": "123",
        "total": 25000,
        "data_pedido": 1616075809364
      },
      {
        "numero_pedido": "d1901180-87f1-11eb-9647-b7c27af6831e",
        "id_usuario": "123",
        "total": 35000,
        "data_pedido": 1616075823795
      },
      {
        "numero_pedido": "d7ad2990-87f1-11eb-9647-b7c27af6831e",
        "id_usuario": "123",
        "total": 60000,
        "data_pedido": 1616075834040
      },
      {
        "numero_pedido": "de3e8740-87f1-11eb-9647-b7c27af6831e",
        "id_usuario": "123",
        "total": 35000,
        "data_pedido": 1616075845068
      }
    ]
}

export const dados_produtos = () => {
   return [
      {
        "id": "eba482a1-87f0-11eb-b154-453384dad18e",
        "nome": "Mini Figura Young Gru",
        "descricao": "Tamanho: Aproximadamente 6cm.",
        "preco": "15.30"
      },
      {
        "id": "eba482a3-87f0-11eb-b154-453384dad18e",
        "nome": "Boneco Minions Otto Filme",
        "descricao": "Comprimento: 3,5 cm",
        "preco": "56.90"
      },
      {
        "id": "eba482a5-87f0-11eb-b154-453384dad18e",
        "nome": "Mini Figura Stuart",
        "descricao": "Tamanho: Aproximadamente 6cm. Boneco Não Articulado.",
        "preco": "17.00"
      },
      {
        "id": "eba482a7-87f0-11eb-b154-453384dad18e",
        "nome": "5 Bonecos Gru",
        "descricao": "MinionsTamanho 6 cm de altura Com Base para ficar em pé",
        "preco": "59.99"
      },
      {
        "id": "eba482a9-87f0-11eb-b154-453384dad18e",
        "nome": "Boneco Minions Travessos",
        "descricao": "Contém articulação básica dos braços",
        "preco": "123.40"
      }
   ]
}