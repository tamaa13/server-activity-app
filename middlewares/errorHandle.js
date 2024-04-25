const errorHandle = (err, req, res, next) => {

    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") return res.status(400).json({ message: err.errors[0].message })
    if (err.name === "Invalid username or password") return res.status(401).json({ message: 'Invalid email or password' })
    if (err.name === "NotFound") return res.status(404).json({ message: 'NotFound' })
    if (err.name === 'Activity not found') return res.status(404).json({ message: 'Activity not found' })
    if (err.name === 'Username is required') return res.status(400).json({ message: 'Username is required' })
    if (err.name === 'Password is required') return res.status(400).json({ message: 'Password is required' })
    if (err.name === 'Rate is required') return res.status(400).json({ message: 'Rate is required' })
    if (err.name === 'Username is already taken') return res.status(409).json({ message: 'Username is already taken' })
    if (err.name === 'project is required') return res.status(408).json({ message: 'project is required' })
    res.status(500).json({ message: 'Internal Server Error' })

}

module.exports = errorHandle