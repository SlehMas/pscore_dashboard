var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

var userModel = {
  getAllUser: getAllUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getUserById: getUserById,
  getStudents,
  getTeachers,
  getTeachersByStudentId,
  getStudentsByTeacherId,
  getTeachersThatAreNotMine,
  assignTeacher,
  getAllApplications
}

function getAllApplications () {
  return new Promise((resolve, reject) => {
    db.query('select * from application', (error, rows, fields) => {
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
function assignTeacher (idStudent, idTeacher) {
  return new Promise((resolve, reject) => {
    db.query(`insert into teacher_student (id_student, id_teacher) values (${idStudent}, ${idTeacher})`,
     (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    });
  })
}
function getAllUser() {
  return new Promise((resolve, reject) => {
    db.query("select id, username, email, firstname, lastname, status from users where status != 'admin' ", (error, rows, fields) => {
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

function getStudents () {
  return new Promise((resolve, reject) => {
    db.query("select id, username, email, firstname, lastname, status from users where status='student'", (error, rows, fields) => {
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

function getTeachersThatAreNotMine (id) {
  return new Promise ((resolve, reject) => {
    db.query(`SELECT *
    FROM users t
    WHERE NOT EXISTS(SELECT NULL FROM teacher_student as ts WHERE ts.id_teacher = t.id and ts.id_student = ${id})
    and t.status = 'teacher'`, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    });
  })
}

function getStudentsByTeacherId (id) {
  return new Promise((resolve, reject) => {
    db.query("select firstname, lastname, email from users t join teacher_student ts where t.id = ts.id_student and ts.id_teacher = " + id, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    });
  })
}
function getTeachersByStudentId (id) {
  return new Promise((resolve, reject) => {
    db.query("select firstname, lastname, email from users t join teacher_student ts where t.id = ts.id_teacher and ts.id_student = " + id, (error, rows, fields) => {
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
function getTeachers () {
  return new Promise((resolve, reject) => {
    db.query("select id, username, email, firstname, lastname, status from users where status='teacher'", (error, rows, fields) => {
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

function getUserById(id) {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE id =" + id, (error, rows, fields) => {
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

function updateUser(user) {
  const userId = user.id
  const keys = Object.keys(user)
  let values = Object.values(user)
  const updateRows = values.map((v, index) => {
    if (typeof v === 'string') v = `'${v}'`
    return `${keys[index]}=${v}` 
  })
  console.log(`update users set ${updateRows.join(',')}where id =${userId}`)
  return new Promise((resolve, reject) => {
    db.query(`update users set ${updateRows.join(',')}where id =${userId}`, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    });
  })
}

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM users WHERE id='" + id + "'", (error, rows, fields) => {
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


module.exports = userModel;

