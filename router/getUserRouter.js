const express = require('express')
const getUserController = require('../controllers/getUserController')
const router = express.Router()

router.get('/', getUserController.getUser)
router.patch('/editUser', getUserController.editUser)


module.exports = router