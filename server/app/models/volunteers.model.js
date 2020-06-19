var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

const volunteerModel = {
  addVolunteer,
  updateVolunteer,
  getAllVolunteers,
  getVolunteersById,
  deleteVolunteer
}

function addVolunteer (volunteer) {
  try {
    console.log(volunteer)
    const keys = Object.keys(volunteer).join(',')
    let values = Object.values(volunteer)
    values = values.map(v => {
      if (typeof v === 'string') v = `'${v}'`
      return v
    })

    console.log(`insert into volunteers (${keys}) values (${values})`)

    return new Promise((resolve, reject) => {
      db.query(`insert into volunteers (${keys}) values (${values})`, (error, rows, fields) => {
        if (!!error) {
          dbFunc.connectionRelease;
          console.log(error.sqlMessage)
          return reject(error.sqlMessage);
        } else {
          dbFunc.connectionRelease;
          return resolve(rows);
        }
      })
    })
  }
  catch (e) {
    console.log(e)
  }
}

function updateVolunteer (volunteer) {
  const volunteerId = volunteer.id
  const keys = Object.keys(volunteer)
  let values = Object.values(volunteer)
  const updateRows = values.map((v, index) => {
    if (typeof v === 'string') v = `'${v}'`
    return `${keys[index]}=${v}`
  })
  console.log(`update volunteers set ${updateRows.join(',')}where id =${volunteerId}`)
  return new Promise((resolve, reject) => {
    db.query(`update volunteers set ${updateRows.join(',')}where id =${volunteerId}`, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error.sqlMessage);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    })
  })
}

function getAllVolunteers() {
  return new Promise((resolve, reject) => {
    db.query("select * from volunteers ", (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    });
  });
}

function getVolunteersById(id) {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM volunteers WHERE id =" + id, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    });
  });
}

function deleteVolunteer(id) {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM volunteers WHERE id='" + id + "'", (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    });
  });
}

module.exports = volunteerModel