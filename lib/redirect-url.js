const checkSession = require('./filters/check-session.js')
const renderProfile = require('./renders/render-profle.js')
const logOut = require('./actions/logout.js')

module.exports = function redirectUrl(req, res, action, users_db) { // check session, then redirect or render based on y/n logged in
  try {
    checkSession(req, res).then(session => {
      if (session == 'true' && action == 'login') {
        res.redirect('/profile')
      } else if (session == 'true' && action == 'logout') {
        logOut(req, res)
      } else if (session == 'true' && action == 'profile') {
        renderProfile(req, res, users_db)
      } else if (session == 'true' && action == 'home') {
        res.render('pages/home', {
          title: 'Homepage'
        })
      } else if (action == 'login') {
        res.render('pages/login', {
          title: 'Login page'
        })
      } else {
        res.redirect('/login')
      }
    })
  } catch (err) {
    console.error(err)
  }
}
