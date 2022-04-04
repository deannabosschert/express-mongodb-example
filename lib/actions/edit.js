module.exports = function editProfile(req, res, users_db) { // look up profile in MongoDB-db by _id and update entry
    users_db.findOne({ 
      _id: req.session.sessionID // find the user in the database by the sessionID
    }, (err, user) => {
      if (err) {
        console.log('MongoDB editprofile findone Error:' + err)
      }
      if (req.body.editUser != user.username) { // if the user is changing their username (if the username is different from the current username) 
        users_db.findOne({  // look up the new username in the database
          username: req.body.editUser // find the user in the database by the new username
        }, (err, username) => {
          if (err) {
            console.log('MongoDB editprofile Error:' + err)
          }
          if (username) { // if the username already exists (taken by someone else already)
            res.render('pages/profile', { 
              'userInfo': user, // send the user's profile information to the profile page
              data: req.body // render page with new data
            })
          } else if (req.file) { // if the user is changing their profile picture
            const img = 'uploads/' + req.file.path.split('/').pop() // get the file name of the uploaded image
            users_db.updateMany({ // update the user's profile information in the database
              _id: req.session.sessionID
            }, {
              $set: { // set the new information
                'username': req.body.editUser,
                'age': req.body.editAge,
                'location': req.body.editLocation,
                'description': req.body.editDescription,
                'avatar': img
              }
            })
            res.redirect('/login')
          } else { // if the user is not changing their profile picture
            users_db.updateMany({ // update the user's profile information in the database
              _id: req.session.sessionID
            }, {
              $set: { // set the new information
                'username': req.body.editUser,
                'age': req.body.editAge,
                'location': req.body.editLocation,
                'description': req.body.editDescription
              }
            })
            res.redirect('/login')
          }
        })
      } else if (req.file) { // if the user is changing their profile picture
        const img = 'uploads/' + req.file.path.split('/').pop() // takes only the relative path out of the array
        users_db.updateMany({ // update the user's profile information in the database
          _id: req.session.sessionID
        }, {
          $set: { // set the new information
            'age': req.body.editAge,
            'location': req.body.editLocation,
            'description': req.body.editDescription,
            'avatar': img
          }
        })
        res.redirect('/login')
      } else { // if the user is not changing their profile picture or username but their age, location, or description
        users_db.updateMany({ // update the user's profile information in the database
          _id: req.session.sessionID
        }, {
          $set: { // set the new information
            'age': req.body.editAge,
            'location': req.body.editLocation,
            'description': req.body.editDescription
          }
        })
        res.redirect('/login')
      }
  
    })
  }
  