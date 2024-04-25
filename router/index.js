const express = require('express')
const router = express.Router()
const userRouter = require('../router/userRouter')
const activityRouter = require('../router/activityRouter')
const projectRouter = require('../router/projectRouter')
const getUserRouter = require('../router/getUserRouter')

const { authenticationUser } = require('../middlewares/authentication')


router.use('/user', userRouter)

router.use(authenticationUser)

router.use('/activity', activityRouter)
router.use('/project', projectRouter)
router.use('/getUser', getUserRouter)


module.exports = router