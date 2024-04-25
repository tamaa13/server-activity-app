const express = require('express')
const activityController = require('../controllers/activityController')
const router = express.Router()

router.get('/', activityController.getAll)

router.post('/create', activityController.createActivity)

router.get('/:id', activityController.getOne)

router.put('/:id', activityController.updateActivity)

router.delete('/:id', activityController.deleteActivity)

module.exports = router