const bcrypt = require('bcrypt')
let saltRounds = 10 // number of rounds to hash the password (higher is more secure)(this means the password is put through a lot of algorithms)

module.exports = function registerProfile(req, res, users_db) { // check if the username is already taken, then insert new profile into db
  let password = req.body.passwordSignup // get the password from the just submitted form

  users_db.findOne({ // look up the user in the database
    username: req.body.userSignup // find the user in the database by the username
  }, (err, user) => {
    if (err) {
      console.log('MongoDB registerprofile findone Error: ' + err)
    }
    if (user) {
      res.render('pages/login', {
        data: req.body
      })
    } else {


      bcrypt.hash(password, saltRounds, (err, hash) => { // hash the password
        {
          if (err) {
            next(err)
          } else {
            const user = { // create a new user object
              username: req.body.userSignup,
              email: req.body.emailSignup.toLowerCase(),
              hash: hash,
              description: '',
              age: '',
              location: '',
              avatar: ''
            }

            console.log(user)
            users_db.insertOne(user, (err) => { // insert the new user into the database
              if (err) {
                console.log('MongoDB registerprofie insertOne Error:' + err)
              } else {
                res.render('pages/signup-completed', {  // render the signup-completed page
                  data: req.body  // render page with new data
                })
              }
            })

          }
        }
      })
    }
  })
}