const Course = require('../models/course.model')
const _ = require('lodash')
const errorHandler = require('../helpers/dbErrorHandler')
const formidable = require('formidable')
const fs = require('fs')

const create = (req, res) => {
  const course = new Course(req.body)
  course.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json({
    })
  })
}
/**
 * Load user and append to req.
 */
const courseByID = (req, res, next, id) => {
  Course.findById(id)
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, course) => {
    if (err || !course) return res.status('400').json({
      error: "Course not found."
    })
    req.profile = course
    next()
  })
}

const list = (req, res) => {
  Course.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(courses)
  }).select('title description instructor')
}

const update = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded."
      })
    }
    let user = req.profile
    user = _.extend(user, fields)
    user.updated = Date.now()
    if(files.photo){
      user.photo.data = fs.readFileSync(files.photo.path)
      user.photo.contentType = files.photo.type
    }
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    })
  })
}

const remove = (req, res, next) => {
  let user = req.profile
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    res.json(deletedUser)
  })
}

const photo = (req, res, next) => {
  if(req.profile.photo.data){
    res.set("Content-Type", req.profile.photo.contentType)
    return res.send(req.profile.photo.data)
  }

  next()
}

const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd()+'/public/assets/images/fish.png')
}

const addStudent = (req, res, next) => {
  Course.findByIdAndUpdate(req.body.userId, {$push: {studentsCurrent: req.body.followId}}, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const removeFollowing = (req, res, next) => {
  User.findByIdAndUpdate(req.body.userId, {$pull: {following: req.body.unfollowId}}, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    next()
  })
}
const removeFollower = (req, res) => {
  User.findByIdAndUpdate(req.body.unfollowId, {$pull: {followers: req.body.userId}}, {new: true})
  .populate('following', '_id name')
  .populate('followers', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    result.hashed_password = undefined
    result.salt = undefined
    res.json(result)
  })
}

const findCourses = (req, res) => {
  let following = req.profile.following
  following.push(req.profile._id)
  User.find({ _id: { $nin : following } }, (err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(courses)
  }).select('title')
}

module.exports = {
  create,
  courseByID,
  list,
  remove,
  update,
  photo,
  defaultPhoto,
  addStudent,
  removeFollowing,
  removeFollower,
  findCourses
}