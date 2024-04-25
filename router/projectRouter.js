const express = require('express')
const projectController = require('../controllers/projectController')
const router = express.Router()

router.get('/', projectController.getAll)
router.post('/', projectController.createProject)
router.get('/:id', projectController.getOne)

module.exports = router