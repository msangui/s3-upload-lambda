const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const parser = require('./parser');

const uploadFile = (Body, Key, Bucket) => {
  const data = {
    Bucket,
    Key,
    Body,
  };
  return S3.upload(data).promise();
};

exports.handler = async (event) => {
  let responseStatusCode = 200;
  let responseMessage = 'success';

  let result;

  try {
    result = await parser(event);
  } catch (e) {
    responseStatusCode = 500;
    responseMessage = e.message;
  }

  try {
    await uploadFile(result.file, result.filename, process.env.BUCKET_NAME);
  } catch (e) {
    responseStatusCode = 500;
    responseMessage = e.message;
  }

  return {
    statusCode: responseStatusCode,
    body: JSON.stringify({
      message: responseMessage,
    }),
  };
};
