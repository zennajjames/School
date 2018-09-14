const express = require('express')
const courseCtrl = require('../../controllers/course.controller')
const userCtrl = require('../../controllers/user.controller')
const authCtrl = require('../../controllers/auth.controller')

const router = express.Router()

router.route('/by/:userId')
  .get(authCtrl.requireSignin, courseCtrl.listCoursesByUser)

router.route('/')
  .get(courseCtrl.list)
  .post(courseCtrl.create)

router.route('/photo/:courseId')
  .get(courseCtrl.photo, courseCtrl.defaultPhoto)
router.route('/defaultphoto')
  .get(courseCtrl.defaultPhoto)

router.route('/enroll')
  .put(authCtrl.requireSignin, courseCtrl.addStudent)
router.route('/unfollow')
  .put(authCtrl.requireSignin, courseCtrl.removeFollowing, courseCtrl.removeFollower)

router.route('/:courseId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, courseCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, courseCtrl.remove)

router.route('/:userId')
  .get(authCtrl.requireSignin, courseCtrl.findCourses)


router.param('courseId', courseCtrl.courseById)
router.param('userId', userCtrl.userByID)

module.exports = router 