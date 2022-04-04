const bcrypt = require('bcrypt')

module.exports = function loginProfile(req, res, users_db) { // check if email+username exist in db, then login
    if (req.body.emailLogin && req.body.passwordLogin) {
      users_db.findOne({
        email: req.body.emailLogin.toLowerCase()
      }, (err, user) => {
        if (err) {
          console.log('MongoDB loginprofile findoneError:' + err)
        }
        if (user) {
          console.log(user)
          var password = req.body.passwordLogin
          bcrypt.compare(password, user.hash, onverify)
  
          function onverify(err, match) {
            if (err) {
              console.log(err)
            } else if (match) {
              req.session.sessionID = user._id
              res.redirect('/profile')
            } else {
              res.status(401).send('Password incorrect')
            }
          }
        }
          else {
          res.render('pages/login', {
            data: req.body
          })
        }
      })
    } else {
      res.render('pages/login', {
        data: req.body
      })
    }
  }
  