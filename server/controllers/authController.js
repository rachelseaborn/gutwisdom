const bcrypt = require('bcryptjs');

const stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports = {

    register: async (req, res) => {
        const { username, email, password, profile_picture } = req.body
        const db = req.app.get('db')

        const [foundUser] = await db.users.check_user({ email })
        if (foundUser) {
            return res.status(400).send('This email is already in use.')
        }
        let salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const [newUser] = await db.users.register_user({ username, email, hash, profile_picture })

        req.session.user = newUser
        res.status(201).send(req.session.user)

    },

    subscribePayment: (req, res) => {
        const { token, amount } = req.body;

        const charge = stripe.charges.create({
            amount,
            currency: 'USD',
            source: token.id,
            description: 'Subscription charge'
        }, function (err, charge) {
            if (err) {
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        })
    },

    login: async (req, res) => {
        const { email, password } = req.body
        const db = req.app.get('db')

        const [foundUser] = await db.users.check_user({ email })
        if (!foundUser) {
            return res.status(400).send('Email not found')
        }
        const authenticated = bcrypt.compareSync(password, foundUser.password)
        if (!authenticated) {
            return res.status(401).send('Password is incorrect.')
        }
        delete foundUser.password
        req.session.user = foundUser
        res.status(202).send(req.session.user)
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}