module.exports = function logOut(req, res) { //  remove session and clear sessionID
    req.session.destroy((err) => { // destroy the session
      if (err) { // if there is an error
        res.redirect('/profile') // redirect to the profile page
      }
  
      res.clearCookie(sessionID) // clear the sessionID cookie
      res.redirect('/login')  // redirect to the login page
    })
  }