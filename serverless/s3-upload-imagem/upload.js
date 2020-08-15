'use strict';

const fetch = require('node-fetch');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

module.exports.fazerUpload = async event => {
   const response = await fetch(event.image_url)
   const buffer = await response.buffer()
   s3.putObject({
      Bucket: process.env.BUCKET,
      Key: event.key,
      Body: buffer,
   })

   return {
      statusCode: 200,
      body: JSON.stringify(
         {
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event,
         },
         null,
         2
      ),
   };
};
