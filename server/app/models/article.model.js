var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

const articleModel = {
  getArticles,
  addArticle,
  deleteArticle,
  updateArticle,
  getArticle
}

function updateArticle (article) {
  const articleId = article.id
  const keys = Object.keys(article)
  let values = Object.values(article)
  const updateRows = values.map((v, index) => {
    if (typeof v === 'string') v = `'${v}'`
    return `${keys[index]}=${v}` 
  })
  return new Promise((resolve, reject) => {
    db.query(`update articles set ${updateRows.join(',')}where id =${articleId}`, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    })
  })
}

function getArticles() {
  return new Promise((resolve, reject) => {
    db.query('SELECT A.`id`, A.`subject`, A.`body`, A.`author`, A.`image`, A.`created_at`, A.`updated_at`, U.username FROM `articles` A join USERS U WHERE U.id = A.author', (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    })
  })
}

function getArticle(id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT A.id, A.subject, A.body, A.author, A.image, A.created_at, A.updated_at, U.username FROM articles A join USERS U WHERE U.id = A.author AND A.id=' + id, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    })
  })
}

function deleteArticle (id) {
  return new Promise((resolve, reject) => {
    db.query(`delete from articles where id=${id}`, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    })
  })
}
function addArticle(article) {
  
  try {
    const keys = Object.keys(article).join(',')
    let values = Object.values(article)
    values = values.map(v => {
      if (typeof v === 'string') v = `'${v}'`
      return v 
    })

    return new Promise((resolve, reject) => {
      db.query(`insert into articles(${keys}) values (${values})`, (error, rows, fields) => {
        if (!!error) {
          dbFunc.connectionRelease;
          reject(error);
        } else {
          dbFunc.connectionRelease;
          resolve(rows);
        }
      })
    })
  }
  catch (e) {
    console.log(e)  
  }
}

module.exports = articleModel

