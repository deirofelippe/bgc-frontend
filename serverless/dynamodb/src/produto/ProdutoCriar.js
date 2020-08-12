'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.criar = async event => {
   const body = JSON.parse(event.body);
   
   let mensagem, infoResponse;
   if (dadosNaoSaoValidos(body)) {
      infoResponse = { mensagem: 'Erro na validação', body: body }
      console.error(infoResponse);
      return gerarResponse(400, infoResponse)
   }

   const produto = prepararProduto(body);
   
   let respostaDynamo
   try {
      respostaDynamo = dynamodb.put(produto, (error, data) => {})
      console.log(respostaDynamo);
   } catch (error) {
      console.error(error);
      return gerarResponse(500, 'Erro na inclusão!')
   }

   mensagem = 'Produto incluido!';
   infoResponse = { mensagem: mensagem, produto: respostaDynamo.rawParams }
   console.log(respostaDynamo.rawParams);
   return gerarResponse(200, infoResponse)
}

const dadosNaoSaoValidos = (body) => {
   const { nome, descricao, preco } = body

   if (typeof nome !== 'string'
      || typeof descricao !== 'string'
      || typeof preco !== 'string') {

      return true;
   }
   return false;
}

const prepararProduto = (body) => {
   const { nome, descricao, preco } = body;
   const timestamp = new Date().getTime();
   const produto = {
      TableName: process.env.TABELA_PRODUTO,
      Item: {
         id: uuid.v1(),
         nome: nome,
         descricao: descricao,
         preco: preco,
         criadoEm: timestamp,
         editadoEm: timestamp,
      },
   };
   return produto;
}

const gerarResponse = (statusCode, mensagem) => {
   return {
      statusCode: statusCode,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ ...mensagem })
   }
}