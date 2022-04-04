const bcrypt = require('bcrypt')

module.exports = function loginProfile(req, res, users_db) { // check if email+username exist in db, then login
    if (req.body.emailLogin && req.body.passwordLogin) { // if the user is logging in with both email and a password
      users_db.findOne({
        email: req.body.emailLogin.toLowerCase() // look up the user in the database by the email
      }, (err, user) => {
        if (err) {
          console.log('MongoDB loginprofile findoneError:' + err)
        }
        if (user) { // if the user exists in the database
          console.log(user)
          let password = req.body.passwordLogin // get the password from the just submitted form
          bcrypt.compare(password, user.hash, onverify) // compare the password with the hash in the database
  
          function onverify(err, matchingPassword) { // callback function
            if (err) {
              console.log(err)
            } else if (matchingPassword) { // if the password is correct
              req.session.sessionID = user._id // set the sessionID to the user's _id
              res.redirect('/profile') // redirect to the profile page
            } else {
              res.status(401).send('Password incorrect')
            }
          }
        }
          else { // if the user does not exist in the database
          res.render('pages/login', {  // render the login page
            data: req.body // render page with new data
          })
        }
      })
    } else { // if the user is logging in with only an email
      res.render('pages/login', {
        data: req.body // render page with new data
      })
    }
  }
  