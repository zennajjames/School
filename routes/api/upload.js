const express = require('express')

const router = express.Router()
const uploadCtrl = require('../../controllers/upload.controller')

router.route('/')
	.post(uploadCtrl.upload);

router.route('/sign-s3')
	.get(uploadCtrl.sign);

module.exports = router 