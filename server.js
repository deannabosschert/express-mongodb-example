// Express/server necessities
const express = require('express') 
const app = express() // create an instance of express
const session = require('express-session') // session middleware for handling sessions (cookies) for the express-server
const bodyParser = require('body-parser') // to support JSON-encoded bodies, used in the post requests to the server (from HTML-forms)
const urlencodedParser = bodyParser.urlencoded({ extended: false }) // to support URL-encoded bodies (from HTML-forms)

const port = process.env.PORT || 3000 // specify the port this server will listen to; if no port is specified, the server will listen to port 3000, but when deployed to Heroku, the port will be taken from the environment variable PORT (which Heroku sets)
const upload = require('./lib/helpers/multer.js') // multer is a middleware that handles file uploads
const liquidEngine = require('./lib/helpers/liquid.js') // this is the liquid engine we'll use to render the HTML-templates with (liquid is a templating engine)
require('dotenv').config() // this is a module that reads the '.env' file and sets the environment variables

// My own modules/functions
const redirectUrl = require('./lib/redirect-url.js') // this is a custom module that I made to redirect the user to the correct page based on their session (logged in/not logged in)
const editProfile = require('./lib/actions/edit.js') // function to edit the user's profile
const loginProfile = require('./lib/actions/login.js') // function to login the user
const registerProfile = require('./lib/actions/register.js') // function to register the user to the database
const removeProfile = require('./lib/actions/remove.js') // function to remove the user's profile from the database


// Database (MongoDB) connection setup
const MongoDBSession = require('connect-mongodb-session')(session)
const MongoClient = require('mongodb').MongoClient

let users_db = null // this will be the database object later on, needed a global variable to access it from other functions
const url = process.env.DB_URL
const dbName = process.env.DB_NAME
const collection = process.env.C_NAME
const options = { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}

MongoClient.connect(url, options, (err, client) => { // connect to mongoDB
  if (err) { console.log('MongoDB-client connect error: ' + err) } // if there is an error, log it
  else { users_db = client.db(dbName).collection(collection)}}) // if there is no error, set the users_db variable to the users collection

// Mongo Session setup
const MongoSession = new MongoDBSession({ // create a new MongoDBSession object
  uri: url,
  collection: collection
})
MongoSession.on('error', (err) => { console.log('MongoDB-session error:' + err) })  // if there is an error, log it


app
  .engine('liquid', liquidEngine) // register liquid as our view engine (can also be handlebars or ejs if you prefer)
  .set('views', './pages') // specify the views directory; this is where the page templates are
  .set('view engine', 'liquid') // set liquid as default engine
  .set('views', './views') // specify the views directory
  .use(express.static('public')) // serve static files from the 'public' folder
  .use(session({ // set up the session
    name: 'sessionID', // name of the cookie
    secret: process.env.SESSION_SECRET, // secret for the cookie
    store: MongoSession, // store the session in the database
    resave: false,  // don't save the session if it hasn't changed
    saveUninitialized: false, // don't save the session if it hasn't been modified
    cookie: { // set the cookie
      sameSite: true, // set the cookie to have the same site as the request
      secure: false // set the cookie to be secure (https)
    }
  }))
  .get('/', (req, res) => {  redirectUrl(req, res, 'home') })   // wanneer je op de url /${url}} zit, voer dan deze functie uit of render dan deze pagina
  .get('/login', (req, res) => { redirectUrl(req, res, 'login', users_db) }) // zelfde als bij '/', maar geef dan de databaseinfo mee
  .post('/logout', (req, res) => { redirectUrl(req, res, 'logout', users_db) }) 
  .get('/profile', (req, res) => { redirectUrl(req, res, 'profile', users_db) })
  .get('/remove', urlencodedParser, (req, res) => { res.render('pages/remove')}) // render the remove page
  .post('/login', urlencodedParser, (req, res) => { loginProfile(req, res, users_db) }) // wanneer het formulier dat als actie '/login' heeft, ontvang dan hier de gepostte data en voer dan de functie loginProfile uit
  .post('/signup', urlencodedParser, (req, res) => { registerProfile(req, res, users_db) })
  .post('/profile', upload.single('editImage'), urlencodedParser, (req, res) => { editProfile(req, res, users_db) }) // when the /edit form is submitted, upload the image and then edit the profile
  .post('/remove', urlencodedParser, (req, res) => { removeProfile(req, res, users_db) })
  .listen(port, () => { console.log(`Running on port ${port}`) }) // specificeer poort
