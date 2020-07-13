const userService = require('../services/user.service');
var schema = require('../schema/userValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');


function init(router) {
  router.route('/applications')
    .get(getAllApplications)
    .put(updateApplication)
  router.route('/user')
    .get(getAllUsers)
    .post(createUser)
  router.route('/user/student')
    .get(getStudents)
  router.route('/user/student/teacher/new')
    .post(assignTeacher)
  router.route('/user/student/:sid/teacher/:tid')
    .delete(removeTeacherForStudent)
  router.route('/user/student/:id/teacher')
    .get(getTeachersByStudentId)
  router.route('/user/student/:id/teacher/new')
    .get(getTeachersThatAreNotMine)
  router.route('/user/teacher')
    .get(getTeachers)
  router.route('/user/teacher/:id/student')
    .get(getStudentsByTeacherId)
  router.route('/user/:id')
    .get(getUserById)
    .delete(deleteUser)
    .put(updateUser);
}

function createUser (req, res) {
  const newUser = req.body
  userService.createUser(newUser).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function updateApplication (req, res) {
  const status = req.body.status
  const appId = req.body.application_id

  userService.updateApplication(status, appId).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function removeTeacherForStudent (req, res) {
  const idStudent = req.params.sid
  const idTeacher = req.params.tid
  console.log('hello', idStudent, idTeacher)
  userService.removeTeacherForStudent(idTeacher, idStudent).then(data => {
    res.send(data);
  }).catch((err) => {
    res.send(err);
  });
}

function getAllApplications (req, res) {
  userService.getAllApplications().then(data => {
    res.send(data);
  }).catch((err) => {
    res.send(err);
  });
}

function assignTeacher (req, res) {
  const idStudent = req.body.studentId
  const idTeacher = req.body.teacherId

  userService.assignTeacher(idStudent, idTeacher).then(data => {
    res.send(data);
  }).catch((err) => {
    res.send(err);
  });
}

function getTeachersThatAreNotMine (req, res) {
  const studentId = req.params.id
  userService.getTeachersThatAreNotMine(studentId).then(data => {
    res.send(data);
  }).catch((err) => {
    res.send(err);
  });
}

function getStudentsByTeacherId (req, res) {
  const teacherId = req.params.id
  userService.getStudentsByTeacherId(teacherId).then(data => {
    res.send(data);
  }).catch((err) => {
    res.send(err);
  });
}

function getTeachersByStudentId (req, res) {
  const studentId = req.params.id
  userService.getTeachersByStudentId(studentId).then(data => {
    res.send(data);
  }).catch((err) => {
    res.send(err);
  });
}

function getStudents(req, res) {
  userService.getStudents().then(data => {
    res.send(data);
  }).catch((err) => {
    res.send(err);
  });
}

function getTeachers(req, res) {
  userService.getTeachers().then(data => {
    res.send(data);
  }).catch((err) => {
    res.send(err);
  });
}

function getAllUsers(req, res) {
  userService.getAllUser().then((data) => {
    res.send(data);
  }).catch((err) => {
    mail.mail(err);
    res.send(err);
  });
}

function getUserById(req, res) {

  let userId = req.params.id;
  console.log(req.params.id)

  userService.getUserById(userId).then((data) => {
    res.send(data);
  }).catch((err) => {
    mail.mail(err);
    res.send(err);
  });
}

function updateUser(req, res) {
  var userData = req.body;
  console.log(userData)
  userService.updateUser(userData).then((data) => {
    res.json(data);
  }).catch((err) => {
    mail.mail(err);
    res.json(err);
  });
}


function deleteUser(req, res) {
  var delId = req.params.id;
  userService.deleteUser(delId).then((data) => {
    res.json(data);
  }).catch((err) => {
    mail.mail(err);
    res.json(err);
  });
}


module.exports.init = init;



