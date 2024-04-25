const { checkPassword } = require('../helper/hash')
const { User } = require('../models')
const { signToken } = require('../helper/jwt')

class userController {
    static async register(req, res, next) {
        const { username, password, rate } = req.body

        try {
            if (!username) throw { name: 'Username is required' }
            if (!password) throw { name: 'Password is required' }
            if (!rate) throw { name: 'Rate is required' }

            const findUser = await User.findOne({
                where: {
                    username
                }
            })
            if (findUser) throw { name: 'Username is already taken' }
            const user = await User.create({ username, password, rate })
            res.status(201).json(`${user.username} success created`)
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { username, password } = req.body
            if (!username) throw { name: 'username is required' }
            if (!password) throw { name: 'Password is required' }
            const user = await User.findOne({
                where: {
                    username
                }
            })

            if (!user) throw { name: 'Invalid username or password' }

            const verified = checkPassword(password, user.password)

            if (!verified) throw { name: 'Invalid username or password' }

            const access_token = await signToken({
                id: user.id,
                username
            })
            res.status(200).json({ access_token })
        } catch (err) {
            next(err);
        }
    }

}

module.exports = userController