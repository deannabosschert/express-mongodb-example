module.exports = function logOut(req, res) { //  remove session and clear sessionID
    req.session.destroy((err) => {
      if (err) {
        res.redirect('/profile')
      }
  
      res.clearCookie(sessionID)
      res.redirect('/login')
    })
  }