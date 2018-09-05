const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const passport = require('../passport')


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

router.get('/google', passport.authenticate('google', {
	scope: ['profile']
}))

router.get(
	'/google/callback', passport.authenticate('google', {
		successRedirect: '/dashboard',
		failureRedirect: '/login'
}))

router.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});
  
router.get('/upload', (req, res) => {
	console.log("made it");
upload(req.query).then(url => {
    res.json({url: url});
}).catch(e => {
    console.log(e);
});
});

// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
	console.log('Retrieving user information...')
	console.log(req.user)
	if (req.user) {
		return res.json({
				user: req.user
			}),
			console.log(req.user);
	} else {
		console.log("No user logged in.")
		return res.json({
			user: null
		})
	}
})

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({
			msg: 'logging you out'
		})
	} else {
		return res.json({
			msg: 'no user to log out!'
		})
	}
})

router.post('/signup', (req, res) => {
	const {
		username,
		password,
		email, 
		fname,
		lname
	} = req.body
	// ADD VALIDATION
	User.findOne({
		'local.email': email
	}, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with email address: ${email}`
			})
		}
		const newUser = new User({
			'local.username': username,
			'local.password': password,
			'firstName': fname,
			'lastName': lname,
			'local.email': email
		})
		newUser.save((err, savedUser, ) => {
			if (err) return res.json(err)
			return res.json(savedUser),
				console.log("New User Created:"+savedUser),
				req.login(email, password, function(err) {
					console.log(err);
				});
		})
	})

	router.post(
		'/login',
		function (req, res, next) {
			console.log(req.body)
			console.log('========Logging in...=======')
			next()
		},
		passport.authenticate('local'),
		(req, res) => {
			console.log("Authenticated.");
			const user = JSON.parse(JSON.stringify(req.user)) // hack
			const cleanUser = Object.assign({}, user)
			if (cleanUser.local) {
				console.log(`Deleting ${cleanUser.local.password}`)
				delete cleanUser.local.password
			}
			res.json({
				user: cleanUser
			})
		}
	)
})

// router.route('/auth/signin')
//   .post(authCtrl.signin)

// router.route('/auth/signout')
//   .get(authCtrl.signout)

module.exports = router