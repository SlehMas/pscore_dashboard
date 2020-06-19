const commentsService = require('../services/comments.service')
const jwt = require('jsonwebtoken')

function init (router) {
  router.route('/comment')
    .get(getComments)
    .post(addComment)
    .put(updateComments)

  router.route('/comment/:id')
    .get(getComment)
    .delete(deleteComments)
}

function getComments (req, res) {
  commentsService.getComments().then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function getComment (req, res) {
  const id = req.params.id
  commentsService.getComment(id).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function addComment (req, res) {
  let newComment = req.body
  // TODO: add currentUser from token
  commentsService.addComment(newComment).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function updateComments (req, res) {
  const oldComment = req.body
 
  commentsService.updateComment(oldComment).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function deleteComments (req, res) {
  const id = req.params.id

  commentsService.deleteComment(id).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });

}
module.exports.init = init
