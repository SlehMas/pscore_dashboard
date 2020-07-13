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
  updateApplication,
  assignTeacher,
  createUser,
  getAllApplications,
  removeTeacherForStudent
}

function createUser (user) {
  const keys = Object.keys(user).join(',')
  let values = Object.values(user)
  values = values.map(v => {
    if (typeof v === 'string') v = `'${v}'`
    return v 
  })

  return new Promise((resolve, reject) => {
    db.query(`insert into users(${keys}) values (${values})`, (error, rows, fields) => {
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

function updateApplication (status, applicaitonId) {
  return new Promise((resolve, reject) => {
    db.query(`update application set status_application = '${status}' where id_application = ${applicaitonId}`, (error, rows, fields) => {
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
    db.query("select * from users where status_user != 'admin' ", (error, rows, fields) => {
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
    db.query("select id_user , username_user, email_user, firstname_user, lastname_user, status_user from users where status_user='student'", (error, rows, fields) => {
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

function removeTeacherForStudent (teachId, studentId) {
  return new Promise ((resolve, reject) => {
    db.query(`DELETE FROM teacher_student WHERE id_student = ${studentId} AND id_teacher = ${teachId}`, (error, rows, fields) => {
      if (!!error) {
        console.log(error)
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    });
  })
}
function getTeachersThatAreNotMine (id) {
  return new Promise ((resolve, reject) => {
    db.query(`SELECT *
    FROM users t
    WHERE NOT EXISTS(SELECT NULL FROM teacher_student as ts WHERE ts.id_teacher = t.id_user and ts.id_student = ${id})
    and t.status_user = 'teacher'`, (error, rows, fields) => {
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
    db.query("select firstname_user, lastname_user, email_user from users t join teacher_student ts where t.id_user = ts.id_student and ts.id_teacher = " + id, (error, rows, fields) => {
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
    db.query("select id_user, firstname_user, lastname_user, email_user from users t join teacher_student ts where t.id_user = ts.id_teacher and ts.id_student = " + id, (error, rows, fields) => {
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
    db.query("SELECT * FROM users WHERE id_user =" + id, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        console.log(error)
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    });
  });
}

function updateUser(user) {
  const userId = user.id_user
  const keys = Object.keys(user)
  let values = Object.values(user)
  const updateRows = values.map((v, index) => {
    if (typeof v === 'string') v = `'${v}'`
    return `${keys[index]}=${v}` 
  })
  console.log(`update users set ${updateRows.join(',')}where id_user =${userId}`)
  return new Promise((resolve, reject) => {
    db.query(`update users set ${updateRows.join(',')}where id_user =${userId}`, (error, rows, fields) => {
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

