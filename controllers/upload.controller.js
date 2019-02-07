const upload = (req, res, next) => {
    var s3Bucket = new AWS.S3();

    var s3 = new Router({ mergeParams: true });

    var params = {
        Bucket: 'BUCKET_NAME', // add your s3 bucket name here
        Key: data.filename,
        Expires: 60,
        ContentType: data.filetype
    };

    s3Bucket.getSignedUrl('putObject', params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
        });
    }

  module.exports = {
    upload
  }