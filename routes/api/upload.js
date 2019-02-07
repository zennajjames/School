const express = require('express')

const router = express.Router()
const uploadCtrl = require('../../controllers/upload.controller')

router.route('/upload')
	.post(uploadCtrl.upload);

module.exports = router 