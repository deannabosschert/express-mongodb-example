module.exports =  function renderProfile(req, res, users_db) { // find user in db and render profile page with data
    users_db.findOne({ // find the user in the database
      _id: req.session.sessionID // by the sessionID
    }, (err, user) => {
      if (err) {
        console.log('MongoDB renderprofile Error:' + err)
      }
      if (user) { // if the user exists in the database
        res.render('pages/profile', { // render the profile page
          'userInfo': user, // send the user's profile information to the profile page
          title: 'Profile'
        })
      } else {
        console.log('Client ID not found')
      }
    })
  }
  