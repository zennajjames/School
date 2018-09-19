const mongoose = require('mongoose')
const crypto = require('crypto')

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Title is required.'
  },
  tagline: {
    type: String,
  },
  description: {
    type: String,
    required: 'Title is required.'
  },
  courseCode: {
    type: String,
    required: 'Course code is required.',
    unique: 'Course code already exists.',
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
  instructor: String,
  created: {
    type: Date,
    default: Date.now
  },
  videos: [
    {
      videoId: Number,
      title: String
    }
  ]
})

module.exports = mongoose.model('Course', CourseSchema)

