// import uuid from 'uuid';
// import dao from '../daos/ProdutoDAO';

// const criar = (event) => {
   // return "AEE!";
   // const produto = prepararProduto(event.body);
   // let mensagem, response;
   
   // if(!dao.criar(produto)){
   //    mensagem = 'Erro ao incluir o produto!';
   //    response = { message: mensagem, produto: produto , input: event }
   //    return {
   //       statusCode: 500,
   //       body: JSON.stringify({ response })
   //    };
   // }
   
   // mensagem = 'Produto incluido!';
   // response = { message: mensagem, produto: produto , input: event }
   // return {
   //    statusCode: 200,
   //    body: JSON.stringify(response),
   // };
// }

// const prepararProduto = (body) => {
//    const { nome, descricao, preco } = body;
//    const timestamp = new Date().getTime();
//    const produto = {
//       TableName: process.env.TABELA_PRODUTO,
//       Item: {
//          id: uuid.v1(),
//          nome: nome,
//          descricao: descricao,
//          preco: preco,
//          criadoEm: timestamp,
//          EditadoEm: timestamp,
//       },
//    };
//    return produto;
// }

// export default criar;