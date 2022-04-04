module.exports = function logOut(req, res) { //  remove session and clear sessionID
  let sessionID = req.session.sessionID

  req.session.destroy((err) => { // destroy the session
      if (err) { // if there is an error
        console.log('Err logging out user: ' + err)
        res.redirect('/profile') // redirect to the profile page
      }
  
      res.clearCookie(sessionID) // clear the sessionID cookie
      res.redirect('/login')  // redirect to the login page
    })
  }