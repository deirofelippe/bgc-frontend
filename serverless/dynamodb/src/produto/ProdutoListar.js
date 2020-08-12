'use strict';

const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports.listar = async event => {
   const params = { TableName: 'Produto' }

   let mensagem, respostaDynamo
   try {
      respostaDynamo = dynamodb.scan(params, (error, data) => {})
      console.log({ ...respostaDynamo })
   } catch (error) {
      console.error(error)
      return gerarResponse(500, 'Erro na listagem')
   }

   // mensagem = { message: 'Listado!' }
   mensagem = { message: 'Listado!', produtos: { ...respostaDynamo.Items }, u: 'u' }
   return gerarResponse(200, mensagem)
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