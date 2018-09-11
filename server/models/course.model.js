const mongoose = require('mongoose')
const crypto = require('crypto')

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Title is required.'
  },
  description: {
    type: String,
    required: 'Title is required.'
  },
  courseCode: {
    type: String,
    required: 'Course code is required.'
  },
  coursePhoto: {
    data: Buffer,
    contentType: String
  },
  gallery: 
    [
      {
    contentType: String,
    data: Buffer,
    created: { type: Date, default: Date.now },
    postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'}
      }
    ],
  students: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  comments: 
    [
      {
    text: String,
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
      }
    ],
  instructor: {type: mongoose.Schema.ObjectId, ref: 'User'},
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Course', CourseSchema)
