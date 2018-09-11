const express = require('express')
const courseCtrl = require('../controllers/course.controller')
const userCtrl = require('../controllers/user.controller')
const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.route('/api/courses')
  .get(courseCtrl.list)
  .post(courseCtrl.create)

router.route('/api/courses/photo/:courseId')
  .get(courseCtrl.photo, courseCtrl.defaultPhoto)
router.route('/api/courses/defaultphoto')
  .get(courseCtrl.defaultPhoto)

router.route('/api/courses/follow')
    .put(authCtrl.requireSignin, courseCtrl.addStudent, courseCtrl.addStudent)
router.route('/api/courses/unfollow')
    .put(authCtrl.requireSignin, courseCtrl.removeFollowing, courseCtrl.removeFollower)

router.route('/api/courses/courses/:courseId')
   .get(authCtrl.requireSignin, courseCtrl.findCourses)

router.route('/api/courses/:courseId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, courseCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, courseCtrl.remove)

router.param('courseId', courseCtrl.courseByID)

module.exports = router