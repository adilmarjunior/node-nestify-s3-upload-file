const AWS = require('aws-sdk')
const uuid = require('uuid')

const s3 = new AWS.S3()

async function createBucket(req, res) {
  try {
    const { Buckets } = await s3.listBuckets({}).promise()
    res.send({ Buckets })
  } catch (error) {
    res.status(500).send({ error })
  }
}

async function getBuckets(req, res) {
  try {
    const { Buckets } = await s3.listBuckets({}).promise()
    res.send({ Buckets })   
  } catch (error) {
    res.status(500).send({ error })  
  }
}

async function createBucket(req, res) {
  try {
    const bucketName = req.params.bucketName + "_" + uuid.v4() 
    const result = await s3.createBucket({ Bucket: bucketName }).promise()
  
    res.send({ result }) 
  } catch (error) {
    res.status(500).send({ error }) 
  }
}

async function deleteBucket(req, res) {
  const bucketParams = {
    Bucket : req.params.bucketName
  };
  
  try {
    const result = s3.deleteBucket(bucketParams).promise()  
    res.send({ result })
  } catch (error) {
    res.status(500).send({ error })
  }
}


module.exports = function (fastify, opts, next) {
  fastify.get('/', getBuckets)
  fastify.post('/:bucketName', createBucket)
  fastify.delete('/:bucketName', deleteBucket)
  next()
}