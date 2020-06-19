var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

const testimoniesModel = {
  addTestimony,
  getTestimonies,
  getTesitomy,
  updateTestimony,
  deleteTestimoy
}

function addTestimony(testimony) {
  try {
    const keys = Object.keys(testimony).join(',')
    let values = Object.values(testimony)
    values = values.map(v => {
      if (typeof v === 'string') v = `'${v}'`
      return v
    })

    return new Promise((resolve, reject) => {
      db.query(`insert into testimonies (${keys}) values (${values})`, (error, rows, fields) => {
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

function getTestimonies() {
  return new Promise((resolve, reject) => {
    return db.query('SELECT T.`id`, T.`subject`, T.`body`, T.`author`, T.`image`, T.`created_at`, T.`updated_at`, U.username FROM `testimonies` T join USERS U WHERE U.id = T.author', (error, rows, fields) => {
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

function getTesitomy(id) {
  return new Promise((resolve, reject) => {
    return db.query('select * from testimonies where id=' + id, (error, rows, fields) => {
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

function updateTestimony(testimony) {
  const testimonyId = testimony.id
  const keys = Object.keys(testimony)
  let values = Object.values(testimony)
  const updateRows = values.map((v, index) => {
    if (typeof v === 'string') v = `'${v}'`
    return `${keys[index]}=${v}`
  })
  return new Promise((resolve, reject) => {
    db.query(`update testimonies set ${updateRows.join(',')}where id =${testimonyId}`, (error, rows, fields) => {
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

function deleteTestimoy(id) {
  return new Promise((resolve, reject) => {
    db.query(`delete from testimonies where id=${id}`, (error, rows, fields) => {
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

module.exports = testimoniesModel