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
  console.log(testimony)
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

function getTestimonies() {
  return new Promise((resolve, reject) => {
    return db.query(`SELECT * FROM testimonies`, (error, rows, fields) => {
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
    return db.query('select * from testimonies where id_testimony=' + id, (error, rows, fields) => {
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
  const testimonyId = testimony.id_testimony
  const keys = Object.keys(testimony)
  let values = Object.values(testimony)
  const updateRows = values.map((v, index) => {
    if (typeof v === 'string') v = `'${v}'`
    return `${keys[index]}=${v}`
  })
  return new Promise((resolve, reject) => {
    db.query(`update testimonies set ${updateRows.join(',')}where id_testimony =${testimonyId}`, (error, rows, fields) => {
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

function deleteTestimoy(id) {
  return new Promise((resolve, reject) => {
    db.query(`delete from testimonies where id_testimony=${id}`, (error, rows, fields) => {
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

module.exports = testimoniesModel