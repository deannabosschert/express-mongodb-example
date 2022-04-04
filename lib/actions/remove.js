const bcrypt = require('bcrypt')
const logOut = require('./logout.js')

module.exports = function removeProfile(req, res, users_db) { // look up profile in MongoDB-db by id and delete entry
    users_db.findOne({ // find the user in the database
        _id: req.session.sessionID // find the user in the database by the sessionID
      }, (err, user) => {
        if (err) {
          console.log('MongoDB removeprofile Error:' + err)
        }
        if (user) { // if the user exists in the database
          bcrypt.compare(req.body.removePassword, user.hash, onverify) // compare the password with the hash in the database
          function onverify(err, matchingPassword) { // callback function
            if (err) {
              console.log(err)
            } else if (matchingPassword) { // if the user has confirmed wanting to remove their account
                users_db.deleteOne({ // delete the user from the database
                  '_id': req.session.sessionID // using the sessionID as identifier
                })
                logOut(req, res) // log out the user
              }
            else { // if the user has not confirmed wanting to remove their account
              res.render('pages/remove', {
                data: 'Password incorrect.'
              })
            }
          } 
        }
        else { // if the user does not exist in the database
            res.redirect('/')
          }
        })
    }