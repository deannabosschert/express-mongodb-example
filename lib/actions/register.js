const bcrypt = require('bcrypt')
let saltRounds = 10

module.exports = function registerProfile(req, res, users_db) { // check if the username is already taken, then insert new profile into db
  let password = req.body.passwordSignup

  users_db.findOne({
    username: req.body.userSignup
  }, (err, user) => {
    if (err) {
      console.log('MongoDB registerprofile findone Error:' + err)
    }
    if (user) {
      res.render('pages/login', {
        data: req.body
      })
    } else {


      bcrypt.hash(password, saltRounds, (err, hash) => {
        {
          if (err) {
            next(err)
          } else {
            const user = {
              username: req.body.userSignup,
              email: req.body.emailSignup.toLowerCase(),
              hash: hash,
              description: '',
              age: '',
              location: '',
              avatar: ''
            }

            console.log(user)
            users_db.insert([user], (err) => {
              if (err) {
                console.log('MongoDB registerprofie insertone Error:' + err)
              } else {
                res.render('pages/signup-completed', {
                  data: req.body
                })
              }
            })

          }
        }
      })
    }
  })
}