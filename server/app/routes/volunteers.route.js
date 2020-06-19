const volunteerService = require('../services/volunteers.service')

function init (router) {
  router.route('/volunteer')
    .get(getVolunteers)
    .post(addVolunteer)
    .put(updateVolunteer)
  router.route('/volunteer/:id')
    .get(getVolunteerById)
    .delete(deleteVolunteer)
}

function addVolunteer (req, res) {
  const newVolunteer = req.body

  volunteerService.addVolunteer(newVolunteer)
    .then(
      data =>res.send(data)
    )
    .catch(
      err => res.send(err)
    )
}

function updateVolunteer (req, res) {
  const oldVolunteer = req.body
  console.log(oldVolunteer)
  volunteerService.updateVolunteer(oldVolunteer)
    .then(
      data =>res.send(data)
    )
    .catch(
      err => res.send(err)
    )
}

function getVolunteers (req, res) {
  
  volunteerService.getVolunteers()
    .then(
      data =>res.send(data)
    )
    .catch(
      err => res.send(err)
    )
}

function deleteVolunteer (req, res) {
  const id = req.params.id

  volunteerService.deleteVolunteer(id)
    .then(
      data =>res.send(data)
    )
    .catch(
      err => res.send(err)
    )
}

function getVolunteerById (req, res) {
  const id = req.params.id
  volunteerService.getVolunteerById(id)
    .then(
      data =>res.send(data)
    )
    .catch(
      err => res.send(err)
    )
  
}

module.exports.init = init