const mongoose = require('mongoose')
const crypto = require('crypto')

const PostSchema = new mongoose.Schema({
  text: {
    type: String,
    required: 'Name is required'
  },
  photos: [{
    data: Buffer,
    contentType: String
  }],
  likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  comments: [{
    text: String,
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
  }],
  postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Post', PostSchema)
