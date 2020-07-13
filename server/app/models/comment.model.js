var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

const commentsModel = {
  addComment,
  updateComment,
  deleteComment,
  getComment,
  getComments
}

function addComment (comment) {
  try {
    const keys = Object.keys(comment).join(',')
    let values = Object.values(comment)
    values = values.map(v => {
      if (typeof v === 'string') v = `'${v}'`
      return v
    })

    return new Promise((resolve, reject) => {
      db.query(`insert into comments (${keys}) values (${values})`, (error, rows, fields) => {
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

function updateComment (comment) {
  const commentId = comment.id
  const keys = Object.keys(comment)
  let values = Object.values(comment)
  const updateRows = values.map((v, index) => {
    if (typeof v === 'string') v = `'${v}'`
    return `${keys[index]}=${v}`
  })
  return new Promise((resolve, reject) => {
    db.query(`update comments set ${updateRows.join(',')}where id =${commentId}`, (error, rows, fields) => {
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

function deleteComment (id) {
  return new Promise((resolve, reject) => {
    db.query(`delete from comments where id=${id}`, (error, rows, fields) => {
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

function getComment (id) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT C.id, C.body, C.created_at, U.username, A.subject FROM comments C JOIN users U JOIN articles A WHERE U.id = C.id_user AND A.id = C.id_article AND C.id = ${id}`, (error, rows, fields) => {
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
function getComments () {
  return new Promise((resolve, reject) => {
    db.query(`SELECT A.id_article, C.id_comment, C.body_comment, C.date_comment,C.id_article_comment, U.username_user, A.subject_article 
              FROM comments C 
              JOIN users U 
              JOIN articles A 
              WHERE U.id_user = C.id_user_comment 
              AND A.id_article = C.id_article_comment`, (error, rows, fields) => {
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

module.exports = commentsModel