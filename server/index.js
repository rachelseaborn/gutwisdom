require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authCtrl = require('./controllers/authController');
const mainCtrl = require('./controllers/mainController');
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    session: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db)
    console.log('db connected')
})

//Auth endpoints

app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.post('/api/payment', authCtrl.subscribePayment)
app.get('/api/logout', authCtrl.logout)

//Main endpoints






app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
