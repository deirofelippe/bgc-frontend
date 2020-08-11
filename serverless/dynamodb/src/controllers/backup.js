'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.criar = async event => {
   const body = JSON.parse(event.body);

   let mensagem, response;
   if (dadosNaoSaoValidos(body)) {
      mensagem = 'Erro na validação';
      response = { message: mensagem, body: body , input: event }
      console.error(response);
      return {
         statusCode: 400,
         body: JSON.stringify({ message: mensagem })
      };
   }
   
   const produto = prepararProduto(body);
   
   const respostaDynamo = dynamodbCriar(produto)
   if(erroNoBancoDados(respostaDynamo)){
      mensagem = 'Erro ao incluir o produto!';
      response = { message: mensagem, produto: produto , input: event }
      console.error(response);
      return {
         statusCode: 500,
         body: JSON.stringify({ response })
      };
   }
   
   mensagem = 'Produto incluido!';
   response = { message: mensagem, produto: produto , input: event }
   console.log(response);
   return {
      statusCode: 200,
      body: JSON.stringify(response),
   };
};

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
         EditadoEm: timestamp,
      },
   };
   return produto;
}

const dynamodbCriar = (produto) => {
   return dynamodb.put(produto, (error, data) => {
      if (error) {
         console.error("Falha na inclusão! ", JSON.stringify(error));
         return
      } else {
         console.log("Incluido! ", JSON.stringify(data));
         return
      }
   });
}

const erroNoBancoDados = (respostaDynamo) => {
   if(respostaDynamo.rawParams.Item.id === undefined){
      return true
   }
   return false
}