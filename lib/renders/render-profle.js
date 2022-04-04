module.exports =  function renderProfile(req, res, users_db) { // find user in db and render profile page with data
    users_db.findOne({
      _id: req.session.sessionID
    }, (err, user) => {
      if (err) {
        console.log('MongoDB renderprofile Error:' + err)
      }
      if (user) {
        res.render('pages/profile', {
          'userInfo': user,
          title: 'Profile'
        })
      } else {
        console.log('Client ID not found')
      }
    })
  }
  