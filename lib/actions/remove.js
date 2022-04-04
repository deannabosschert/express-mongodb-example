module.exports = function removeProfile(req, res, users_db) { // look up profile in MongoDB-db by id and delete entry
    users_db.findOne({
      _id: req.session.sessionID
    }, (err, user) => {
      if (err) {
        console.log('MongoDB removeprofile Error:' + err)
      }
      if (user) {
        if (req.body.removePassword == user.password) {
          users_db.deleteOne({
            '_id': req.session.sessionID
          })
          req.session.destroy((err) => {
            if (err) {
              console.log('Err deleting user:' + err)
            }
  
            res.clearCookie(sessionID)
            res.redirect('/login')
          })
        } else {
          res.render('pages/remove', {
            data: 'Password incorrect.'
          })
        }
  
      } else {
        res.redirect('/')
      }
    })
  }