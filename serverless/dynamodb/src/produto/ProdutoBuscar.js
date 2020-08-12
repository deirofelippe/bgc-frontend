'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.buscar = async (event, context) => {
   const params = {
      TableName: 'Produto',
      Key: {
         id: event.pathParameters.id,
      },
   };

   let result
   try{
      result = dynamodb.get(params, (error, data) => {});
      console.log(result.Item)
   }catch(error){
      console.error(error)
      return {
         statusCode: 500,
         headers: { 
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
         },
         body: JSON.stringify(error),
      };
   }

   return {
      statusCode: 200,
      headers: { 
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result.Item),
   };
};

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