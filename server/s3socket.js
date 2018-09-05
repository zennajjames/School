
const fileupload = require("express-fileupload");

// ======= Socket.io =====
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection', function(socket){
  console.log('A user connected.');
  socket.on('disconnect', function(){
    console.log('User disconnected.');
  });
  socket.on('example_message', function(msg){
    console.log('message: ' + msg);
  });
});
io.listen(8000);


const aws = require('aws-sdk');
    const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
    const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
    const BUCKET = process.env.BUCKET;
    
    aws.config.update({
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_KEY
    });

upload = file => {
	const s3 = new aws.S3();
	const params = {
	  Bucket: BUCKET,
	  Key: file.filename,
	  Expires: 60,
	  ContentType: file.filetype
	};
  
	return new Promise((resolve, reject) => {
	  s3.getSignedUrl('putObject', params, (err, url) => {
		if (err) {
		  reject(err);
		}
		resolve(url);
	  });
	});
	}
	
// ================ Amazon Services

const BUCKET_NAME = 'schoollms';
const IAM_USER_KEY = process.env.AWS_ACCESS_KEY_ID;
const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;

const AWS = require("aws-sdk");

app.use(fileupload());


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
		  console.log(err);
		}
		console.log('success');
		console.log(data);
	  })
	})
  }
  
  app.post("/upload", function(req, res){
	uploadToS3(req.files.file);
	res.send("!")
  });
  