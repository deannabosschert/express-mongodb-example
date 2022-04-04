module.exports = function removeProfile(req, res, users_db) { // look up profile in MongoDB-db by id and delete entry
    users_db.findOne({  // find the user in the database
      _id: req.session.sessionID  // find the user in the database by the sessionID
    }, (err, user) => {
      if (err) {
        console.log('MongoDB removeprofile Error:' + err)
      }
      if (user) { // if the user exists in the database
        if (req.body.removePassword == user.password) {  // if the user has confirmed wanting to remove their account
          users_db.deleteOne({ // delete the user from the database
            '_id': req.session.sessionID // by the sessionID
          })
          req.session.destroy((err) => { // destroy the session
            if (err) {
              console.log('Err deleting user:' + err)
            }
  
            res.clearCookie(sessionID)  // clear the cookie
            res.redirect('/login')  // redirect to the login page
          })
        } else { // if the user has not confirmed wanting to remove their account
          res.render('pages/remove', {
            data: 'Password incorrect.'
          })
        }
  
      } else {
        res.redirect('/')
      }
    })
  }