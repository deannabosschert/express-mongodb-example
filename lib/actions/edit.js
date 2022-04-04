module.exports = function editProfile(req, res, users_db) { // look up profile in MongoDB-db by _id and update entry
    users_db.findOne({
      _id: req.session.sessionID
    }, (err, user) => {
      if (err) {
        console.log('MongoDB editprofile findone Error:' + err)
      }
      if (req.body.editUser != user.username) {
        users_db.findOne({
          username: req.body.editUser
        }, (err, username) => {
          if (err) {
            console.log('MongoDB editprofile Error:' + err)
          }
          if (username) {
            res.render('pages/profile', {
              'userInfo': user,
              data: req.body
            })
          } else if (req.file) {
            const img = 'uploads/' + req.file.path.split('/').pop()
            users_db.updateMany({
              _id: req.session.sessionID
            }, {
              $set: {
                'username': req.body.editUser,
                'age': req.body.editAge,
                'location': req.body.editLocation,
                'description': req.body.editDescription,
                'avatar': img
              }
            })
            res.redirect('/login')
          } else {
            users_db.updateMany({
              _id: req.session.sessionID
            }, {
              $set: {
                'username': req.body.editUser,
                'age': req.body.editAge,
                'location': req.body.editLocation,
                'description': req.body.editDescription
              }
            })
            res.redirect('/login')
          }
        })
      } else if (req.file) { // als er een foto wordt geupload, moet dit nog uitgevoerd worden
        const img = 'uploads/' + req.file.path.split('/').pop() // takes only the relative path out of the array
        users_db.updateMany({
          _id: req.session.sessionID
        }, {
          $set: {
            'age': req.body.editAge,
            'location': req.body.editLocation,
            'description': req.body.editDescription,
            'avatar': img
          }
        })
        res.redirect('/login')
      } else {
        users_db.updateMany({
          _id: req.session.sessionID
        }, {
          $set: {
            'age': req.body.editAge,
            'location': req.body.editLocation,
            'description': req.body.editDescription
          }
        })
        res.redirect('/login')
      }
  
    })
  }
  