const dotenv = require("dotenv");
dotenv.config();

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const BUCKET_NAME = 'schooldemo';
const IAM_USER_KEY = process.env.AWS_ACCESS_KEY_ID;
const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;

function uploadToS3(file){
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function(){
    var params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data
    };
    s3bucket.upload(params, function(err, data){
      if(err){
        console.log('error in callback');
      }
      console.log('s3 success');
    })
  })
}

const upload = (req, res) => {
  console.log("s3Request:");
  uploadToS3(req.files.file);
  res.send("!")
}

const sign = (req, res) => {
  const { fileName, fileType } = req.query;
  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.error(data);
      res.json({
        signedRequest: data,
        url: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${fileName}`
      });
    }
   });
  };



  module.exports = {
    upload,
    sign
  }


  // uploadToS3(req.files.file);
  // res.send("!")