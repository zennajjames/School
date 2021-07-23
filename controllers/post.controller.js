const Post = require('../models/post.model')
const _ = require('lodash')
const errorHandler = require('./../helpers/dbErrorHandler')
const formidable = require('formidable')
const fs = require('fs')


const create = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }
    let post = new Post(fields)
    post.postedBy= req.profile
    if(files.photo){
      post.photo.data = fs.readFileSync(files.photo.path)
      post.photo.contentType = files.photo.type
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(result)
    })
  })
}


const postByID = (req, res, next, id) => {
  Post.findById(id).populate('postedBy', '_id name').exec((err, post) => {
    if (err || !post)
      return res.status('400').json({
        error: "Post not found."
      })
    req.post = post
    next()
  })
}

const photo = (req, res, next) => {
  console.log("Photo Request:")
  console.log(req.post.photo.data)
  res.set("Content-Type", req.post.photo.contentType)
  console.log("Photo Response:")
  console.log(req.post.photo.data)
  return res.send(req.post.photo.data)
}


const listByUser = (req, res) => {
  Post.find({postedBy: req.profile._id})
  .populate('comments', 'text created')
  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id name')
  .sort('-created')
  .exec((err, posts) => {
    console.log(posts)
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(posts)
  })
}

const listNewsFeed = (req, res) => {
  console.log(req.profile)
  let following = req.profile.following
  following.push(req.profile._id)
  Post.find({postedBy: { $in : req.profile.following } })
  .populate('comments', 'text created')
  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id name role')
  .sort('-created')
  .exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(posts)
  })
}

const remove = (req, res) => {
  let post = req.post
    post.remove((err, deletedPost) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(deletedPost)
    })
}


const like = (req, res) => {
  Post.findByIdAndUpdate(req.body.postId, {$push: {likes: req.body.userId}}, {new: true})
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(result)
  })
}

const unlike = (req, res) => {
  Post.findByIdAndUpdate(req.body.postId, {$pull: {likes: req.body.userId}}, {new: true})
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(result)
  })
}


const comment = (req, res) => {
  let comment = req.body.comment
  comment.postedBy = req.body.userId
  Post.findByIdAndUpdate(req.body.postId, {$push: {comments: comment}}, {new: true})
  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(result)
  })
}
const uncomment = (req, res) => {
  let comment = req.body.comment
  Post.findByIdAndUpdate(req.body.postId, {$pull: {comments: {_id: comment._id}}}, {new: true})
  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(result)
  })
}

const isPoster = (req, res, next) => {
  let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id
  if(!isPoster){
    return res.status('403').json({
      error: "User is not authorized."
    })
  }
  next()
}

module.exports = {
  listByUser,
  listNewsFeed,
  create,
  postByID,
  remove,
  photo,
  like,
  unlike,
  comment,
  uncomment,
  isPoster
}


// const create = (req, res, next) => {
//   console.log(req.body)
//   let form = new formidable.IncomingForm()
//   form.keepExtensions = true
//   form.multiples = true;
//   form.parse(req, (err, fields, files) => {

//     for(let i in files){
//       console.log("Logging files..")
//       console.log(files.File);
//     }

//     if (err) {
//       return res.status(400).json({
//         error: "Image could not be uploaded."
//       })
//     }

//     let post = new Post(fields)

//     if(files){
      
//       // var fileArray = files.map(a => a.File);
//       // console(fileArray)

//       console.log("Files exist!")
//       let photoArray = []
//       let length = files.File.length
//       console.log(length)

//       for (let i=0; i<length; i++) {
//         photoArray.push({
//           data: fs.readFileSync(files.File[i].path),
//           contentType: files.File[i].type,
//           index: [i]
//         })
//       }
//       console.log(photoArray)
//       post.photos = photoArray
//       post.postedBy = req.profile._id
//       console.log(post)
//     } 
     
//     post.save((err, result) => {
//       if (err) {
//         return res.status(400).json({
//           error: errorHandler.getErrorMessage(err)
//         })
//       }
//       res.json(result)
//     })
//   })