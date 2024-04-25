const { User } = require('../models')

class getUserController {
    static async getUser(req, res, next) {
        try {
            const { username, rate } = req.user
            res.status(200).json({ username, rate })
        } catch (err) {
            next(err)
        }
    }

    static async editUser(req, res, next) {
        try {
            const { username, rate } = req.body
            const { id } = req.user
            // const findUser = await User.findOne({ where: { username } })

            // if (findUser) throw { name: 'Username is already taken' }

            const user = await User.update({ username, rate }, { where: { id } })
            res.status(200).json(user)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = getUserController