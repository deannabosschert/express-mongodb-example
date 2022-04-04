const express = require('express')
const app = express()
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const sessionID = 'sessionID'
let users_db = null

const redirectUrl = require('./lib/redirect-url.js')
const editProfile = require('./lib/actions/edit.js')
const loginProfile = require('./lib/actions/login.js')
const registerProfile = require('./lib/actions/register.js')
const removeProfile = require('./lib/actions/remove.js')
const upload = require('./lib/helpers/multer.js')
const liquidEngine = require('./lib/helpers/liquid.js')


require('dotenv').config()
const url = process.env.DB_URL
const port = process.env.PORT || 3000
const mongoSession = new MongoDBSession({
  uri: url,
  collection: process.env.C_NAME
})


MongoClient.connect(url, (err, client) => {
  if (err) { console.log('MongoDB-client connect error:' + err) }
  else { users_db = client.db(process.env.DB_NAME).collection('users')}})
mongoSession.on('error', (err) => { console.log('MongoDB-session error:' + err) })  // error'afhandeling' mongodb

app
  .engine('liquid', liquidEngine) // register liquid engine
  .set('views', './pages') // specify the views directory
  .set('view engine', 'liquid') // set liquid as default
  .set('views', './views')
  .use(express.static('public'))
  .use(session({
    name: sessionID,
    secret: process.env.SESSION_SECRET,
    store: mongoSession,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: true,
      secure: false
    }
  }))
  .get('/', (req, res) => {  redirectUrl(req, res, 'home') })   // wanneer je op de url /${url}} zit, voer dan deze functie uit of render dan deze pagina
  .get('/login', (req, res) => { redirectUrl(req, res, 'login', users_db) }) // zelfde als bij '/', maar geef dan de databaseinfo mee
  .post('/logout', (req, res) => { redirectUrl(req, res, 'logout', users_db) })
  .get('/profile', (req, res) => { redirectUrl(req, res, 'profile', users_db) })
  .get('/remove', urlencodedParser, (req, res) => { res.render('pages/remove')})
  .post('/login', urlencodedParser, (req, res) => { loginProfile(req, res, users_db) }) // wanneer er iets wordt gepost op deze url, voer dan deze functie uit
  .post('/signup', urlencodedParser, (req, res) => { registerProfile(req, res, users_db) })
  .post('/profile', upload.single('editImage'), urlencodedParser, (req, res) => { editProfile(req, res, users_db) })
  .post('/remove', urlencodedParser, (req, res) => { removeProfile(req, res, users_db) })
  .listen(port, () => { console.log(`Running on port ${port}`) }) // specificeer poort
