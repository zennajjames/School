const Course = require('../models/course.model')
const User = require('../models/user.model')
const _ = require('lodash')
const errorHandler = require('../helpers/dbErrorHandler')
const formidable = require('formidable')
const fs = require('fs')

const create = (req, res) => {
  Course.create(req.body)
    .then(function(dbCourse) {
      console.log("NEW COURSE:")
      console.log(dbCourse)
      // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return User.update({_id:req.body.instructor}, { $push: { courses: dbCourse._id } }, { new: true });
    })
    .then(function(dbUser) {
      // If the User was updated successfully, send it back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    })
};

/**
 * Load user and append to req.
 */
const courseById = (req, res, next, id) => {
  Course.findById(req.params.courseId)
    .then(function(dbCourse) {
      // If able to successfully find and associate all Users and Notes, send them back to the client
      req.profile = dbCourse
    next()
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
  });
}

const read = (req, res) => {
  return res.json(req.profile)
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

const listOne = (req, res) => {
  Course.findById(req.params.courseId)
    .then(function(dbCourse) {
      // If able to successfully find and associate all Users and Notes, send them back to the client
      res.json(dbCourse);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
  });
}

const update = (req, res, next) => {
  console.log("updating..")
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded."
      })
    }
    let course = req.profile
    course = _.extend(course, fields)
    course.updated = Date.now()
    if(files.photo){
      course.photo.data = fs.readFileSync(files.photo.path)
      course.photo.contentType = files.photo.type
    }
    course.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(course)
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
  read,
  remove,
  update,
  photo,
  defaultPhoto,
  addStudent,
  list, 
  listOne
}
