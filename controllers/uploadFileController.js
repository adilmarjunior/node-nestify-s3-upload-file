const AWS = require('aws-sdk')

const s3 = new AWS.S3()
const S3_BUCKET_NAME = 'upload-file-bucket-test-1234567'

async function uploadFile(req, res) {
  try {
    const data = await req.file()
    const fileName = data.filename;
    const fileType = data.mimetype;
    const file = data.file;
    
    const s3Params = {
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read',
      Body: file
    };

    const result = await s3.upload(s3Params).promise()

    res.send({ result })
  
  } catch (error) {
    res.status(500).send({ error })  
  }
}

module.exports = function (fastify, opts, next) {
  fastify.post('/', uploadFile)
  next()
}