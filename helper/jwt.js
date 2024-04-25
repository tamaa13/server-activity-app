const jwt = require('jsonwebtoken')
const SECRET_JWT = process.env.SECRET_KEY

const signToken = async (data) => {
    return await jwt.sign(data, SECRET_JWT)
}

const verifToken = async (payload) => {
    try {
        const decode = await jwt.verify(payload, SECRET_JWT)
        return decode
    } catch (error) {
        console.log(error)
    }
}

module.exports = { signToken, verifToken }