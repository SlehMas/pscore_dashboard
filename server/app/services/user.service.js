var userModel = require("../models/user-model.js");


var userService = {
  getAllUser: getAllUser,
  getUserById: getUserById,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getStudents,
  getTeachers,
  getTeachersByStudentId,
  getStudentsByTeacherId,
  getTeachersThatAreNotMine,
  assignTeacher,
  getAllApplications,
  updateApplication,
  removeTeacherForStudent,
  createUser
}

function createUser (user) {
  return new Promise((resolve, reject) => {
    userModel.createUser(suser).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  })
}

function updateApplication (status, appId) {
  return new Promise((resolve, reject) => {
    userModel.updateApplication(status, appId).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  })
}

function removeTeacherForStudent (teachId, studentId) {
  return new Promise((resolve, reject) => {
    userModel.removeTeacherForStudent(teachId, studentId).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  })
}
function getAllApplications () {
  return new Promise((resolve, reject) => {
    userModel.getAllApplications().then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  })
}

function assignTeacher (idStudent, idTeacher) {
  return new Promise((resolve, reject) => {
    userModel.assignTeacher(idStudent, idTeacher).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  })
}
function getTeachersThatAreNotMine(id) {
  return new Promise((resolve, reject) => {
    userModel.getTeachersThatAreNotMine(id).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  })
}

function getStudentsByTeacherId(id) {
  return new Promise((resolve, reject) => {
    userModel.getStudentsByTeacherId(id).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  })
}

function getTeachersByStudentId(id) {
  return new Promise((resolve, reject) => {
    userModel.getTeachersByStudentId(id).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  })
}

function updateUser(userData) {
  
  return new Promise((resolve, reject) => {
    console.log(userData)
    userModel.updateUser(userData).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  })
}

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    userModel.deleteUser(id).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  })
}

function getAllUser() {
  return new Promise((resolve, reject) => {
    userModel.getAllUser().then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  });
}

function getStudents() {
  return new Promise((resolve, reject) => {
    userModel.getStudents().then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  });
}

function getTeachers() {
  return new Promise((resolve, reject) => {
    userModel.getTeachers().then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  });
}

function getUserById(id) {
  return new Promise((resolve, reject) => {
    userModel.getUserById(id).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  });
}


module.exports = userService;

