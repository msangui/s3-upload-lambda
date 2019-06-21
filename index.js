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

const respond = (statusCode, message) => ({
  statusCode,
  body: JSON.stringify({message}),
});

exports.handler = async (event) => {
  let result;

  try {
    result = await parser(event);
  } catch (e) {
    return respond(500, e.message);
  }

  try {
    await uploadFile(result.file, result.filename, process.env.BUCKET_NAME);
  } catch (e) {
    return respond(500, e.message);
  }


  return respond(200, 'success');
};
