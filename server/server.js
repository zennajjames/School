// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('Loading dev environments...')
	require('dotenv').config()
}
require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')

const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database

const passport = require('./passport')
const fileupload = require("express-fileupload");

// ===================
const app = express()
const PORT = process.env.PORT || 3001

// ===== Middleware ====
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false	}))
app.use(bodyParser.json())

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

// ===== Authentication ====
app.use(
	session({
		secret: process.env.APP_SECRET || 'lwfhkjweioeowfhikmks',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	console.log('YOU ARE IN THE PRODUCTION ENV')
	app.use('/static', express.static(path.join(__dirname, '../build/static')))
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../build/'))
	})
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
  
/* Express app ROUTING */
app.use('/auth', require('./auth'))

// ====== Error handler ====
app.use(function (err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})

// Start the API server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});