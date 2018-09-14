const express = require('express')
const authCtrl = require('../../controllers/auth.controller')

const router = express.Router()

router.route('/signin')
  .post(authCtrl.signin)
router.route('/signout')
  .get(authCtrl.signout)

module.exports = router