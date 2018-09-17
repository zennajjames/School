const Course = require('../models/course.model')
const User = require('../models/user.model')
const _ = require('lodash')
const errorHandler = require('../helpers/dbErrorHandler')
const formidable = require('formidable')
const fs = require('fs')

const create = (req, res) => {
  Course.create(req.body)
    .then(function(dbCourse) {
      console.log(dbCourse)
      return User.findOneAndUpdate(req.body.instructor, { $push: { courses: dbCourse.instructor } }, { new: true });
    })
    .then(function(dbCourse) {
      // If the User was updated successfully, send it back to the client
      res.json(dbCourse);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
}

const courseById = (req, res, next, id) => {
  Course.findById(id).exec((err, course) => {
    if (err || !course)
      return res.status('400').json({
        error: "Course not found."
      })
    req.course = course
    next()
  })
}

const list = (req, res) => {
  Course.find((err, courses) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(courses)
  }).select('title description courseCode students instructor')
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
  return res.sendFile(process.cwd()+'/client/public/assets/images/chair.png')
}

const addStudent = (req, res) => {
  let course = req.body.courseCode
  Course.findOneAndUpdate({courseCode: course}, {$push: {students: req.body.userId}}, {new: true})
  .exec((err, result) => {
        if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(result)
  })
}


module.exports = {
  create,
  courseById,
  remove,
  update,
  photo,
  defaultPhoto,
  addStudent,
  list
}
