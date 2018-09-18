const express = require('express')
const userCtrl = require('../../controllers/user.controller')
const authCtrl = require('../../controllers/auth.controller')
const postCtrl = require('../../controllers/post.controller')

const router = express.Router()

router.route('/new/:userId')
  .post(authCtrl.requireSignin, postCtrl.create)

  router.route('/photo/:postId')
  .get(postCtrl.photo)

  router.route('/photo/:postId/:photoId')
  .get(postCtrl.photo)

router.route('/by/:userId')
  .get(authCtrl.requireSignin, postCtrl.listByUser)

router.route('/feed/:userId')
  .get(authCtrl.requireSignin, postCtrl.listNewsFeed)

router.route('/like')
  .put(authCtrl.requireSignin, postCtrl.like)
router.route('/unlike')
  .put(authCtrl.requireSignin, postCtrl.unlike)

router.route('/comment')
  .put(authCtrl.requireSignin, postCtrl.comment)
router.route('/uncomment')
  .put(authCtrl.requireSignin, postCtrl.uncomment)

router.route('/:postId')
  .delete(authCtrl.requireSignin, postCtrl.isPoster, postCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('postId', postCtrl.postByID)

module.exports = router