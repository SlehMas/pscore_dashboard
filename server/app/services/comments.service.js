var commentsModel = require('../models/comment.model')

const commentsService = {
  addComment,
  updateComment,
  deleteComment,
  getComments,
  getComment
}

function addComment (Comment) {
  return new Promise((resolve, reject) => {
    commentsModel.addComment(Comment).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function updateComment (Comment) {
  return new Promise((resolve, reject) => {
    commentsModel.updateComment(Comment).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function deleteComment(id) {
  return new Promise((resolve, reject) => {
    commentsModel.deleteComment(id).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function getComments () {
  return new Promise((resolve, reject) => {
    commentsModel.getComments().then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function getComment (id) {
  return new Promise((resolve, reject) => {
    commentsModel.getComment(id).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = commentsService