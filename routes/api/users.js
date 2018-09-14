const express = require('express')
const userCtrl = require('../../controllers/user.controller')
const authCtrl = require('../../controllers/auth.controller')

const router = express.Router()

router.route('/')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/photo/:userId')
  .get(userCtrl.photo, userCtrl.defaultPhoto)
router.route('/defaultphoto')
  .get(userCtrl.defaultPhoto)

router.route('/follow')
    .put(authCtrl.requireSignin, userCtrl.addFollowing, userCtrl.addFollower)
router.route('/unfollow')
    .put(authCtrl.requireSignin, userCtrl.removeFollowing, userCtrl.removeFollower)

router.route('/enroll')
.put(authCtrl.requireSignin, userCtrl.addCourse, userCtrl.addStudent) 

router.route('/findpeople/:userId')
   .get(authCtrl.requireSignin, userCtrl.findPeople)

router.route('/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)

module.exports = router

