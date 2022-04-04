const checkSession = require('./filters/check-session.js')
const renderProfile = require('./renders/render-profle.js')
const logOut = require('./actions/logout.js')

module.exports = function redirectUrl(req, res, action, users_db) { // check session, then redirect or render based on y/n logged in
  try {
    checkSession(req, res).then(session => { // check for active session
      if (session == 'true' && action == 'login') { // if the user is logged in and trying to log in
        res.redirect('/profile') // redirect to the profile page
      } else if (session == 'true' && action == 'logout') { // if the user is logged in and trying to log out
        logOut(req, res) // log out the user
      } else if (session == 'true' && action == 'profile') { // if the user is logged in and trying to view their profile
        renderProfile(req, res, users_db) // render the profile page
      } else if (session == 'true' && action == 'home') { // if the user is logged in and trying to view the home page
        res.render('pages/home', { // render the home page
          title: 'Homepage'
        })
      } else if (action == 'login') { // if the user is not logged in and trying to log in
        res.render('pages/login', { // render the login page
          title: 'Login page'
        })
      } else { // if the user is not logged in and trying to view the home page
        res.redirect('/login')
      }
    })
  } catch (err) {
    console.error(err)
  }
}
