var volunteerModel = require('../models/volunteers.model')

const volunteerService = {
  addVolunteer,
  updateVolunteer,
  deleteVolunteer,
  getVolunteerById,
  getVolunteers
}

function addVolunteer (volunteer) {
  return new Promise((resolve, reject) => {
    volunteerModel.addVolunteer(volunteer).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function updateVolunteer (volunteer) {
  console.log(volunteer)
  return new Promise((resolve, reject) => {
    volunteerModel.updateVolunteer(volunteer).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function deleteVolunteer (id) {
  return new Promise((resolve, reject) => {
    volunteerModel.deleteVolunteer(id).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function getVolunteerById (id) {
  return new Promise((resolve, reject) => {
    volunteerModel.getVolunteersById(id).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function getVolunteers () {
  return new Promise((resolve, reject) => {
    volunteerModel.getAllVolunteers().then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = volunteerService