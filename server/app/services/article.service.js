const articleModel = require("../models/article.model")

const articleService = {
  getArticles,
  getArticle,
  addArticle,
  updateArticle,
  deleteArticle
}


function getArticle (id) {
  return new Promise((resolve, reject) => {
    articleModel.getArticle(id).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
function deleteArticle(id) {
  return new Promise((resolve, reject) => {
    articleModel.deleteArticle(id).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function updateArticle(article) {
  return new Promise((resolve, reject) => {
    articleModel.updateArticle(article).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
function getArticles() {
  return new Promise((reslove, reject) => {
    articleModel.getArticles().then((data) => {
      reslove(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function addArticle(article) {
  return new Promise((resolve, reject) => {
    articleModel.addArticle(article).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
module.exports = articleService