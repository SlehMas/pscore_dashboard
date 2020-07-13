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
  const articleId = article.id_article

  const keys = Object.keys(article)
  let values = Object.values(article)
  const updateRows = values.map((v, index) => {
    if (typeof v === 'string') v = `'${v}'`
    return `${keys[index]}=${v}` 
  })

  return new Promise((resolve, reject) => {
    db.query(`update articles set ${updateRows.join(',')}where id_article =${articleId}`, (error, rows, fields) => {
      if (!!error) {
        console.log(error)
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
    db.query('SELECT * from articles', (error, rows, fields) => {
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
    db.query('SELECT * from articles where id_article =' + id, (error, rows, fields) => {
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
    db.query(`delete from articles where id_article=${id}`, (error, rows, fields) => {
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
          console.log(error)
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

