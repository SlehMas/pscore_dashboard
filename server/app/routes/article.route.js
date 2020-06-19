const articleService = require('../services/article.service')
var schema = require('../schema/articleValidationSchema.json')
var iValidator = require('../../common/iValidator');

function init(router) {
  router.route('/article')
    .get(getArticles)
    .post(addArticle)
    .put(updateArticle)

  router.route('/article/:id')
    .get(getArticle)
    .delete(deleteArticle)
}

function getArticle(req, res) {
  const id = req.params.id
  articleService.getArticle(id).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function deleteArticle(req, res) {
  const id = req.params.id
  articleService.deleteArticle(id).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}
function updateArticle(req, res) {
  const oldArticle = req.body
  console.log(oldArticle)
  articleService.updateArticle(oldArticle).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}
function getArticles(req, res) {
  articleService.getArticles().then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function addArticle(req, res) {
  const newArticle = req.body
  var json_format = iValidator.json_schema(schema.postSchema, newArticle, "newArticle");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }
  articleService.addArticle(newArticle).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

module.exports.init = init