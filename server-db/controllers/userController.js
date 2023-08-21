const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt')
const { User } = require('../models/index')

class userController {
    static async readUser(req, res, next) {
        try {
            const user = await User.findAll()
            res.status(200).json({
                message: user
            })
        } catch (err) {
            next(err)
        }
    }

    static async register(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body

            const created = await User.create({ username, email, password, phoneNumber, address, role: 'admin' })

            res.status(201).json({
                msg: {
                    id: created.id,
                    username: created.username,
                    email: created.email,
                    password: created.password,
                    phoneNumber: created.phoneNumber,
                    address: created.address

                }
            })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                throw { name: "LoginError" }
            }
            const user = await User.findOne(
                {
                    where:
                    {
                        email: email
                    }
                })

            if (!user) throw { name: 'LoginError' }

            const isValidate = comparePassword(password, user.password)

            if (!isValidate) throw { name: 'LoginError' }

            const token = signToken({
                id: user.id,
                email: user.email,
                role: user.role
            })

            res.status(200).json({
                access_token: token,
                username: user.username,
                role: user.role,
                email: user.email


            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = userController