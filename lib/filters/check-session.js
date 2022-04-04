module.exports = function checkSession(req, res) { // check for active session
  return new Promise((resolve, reject) => {
    if (req.session.sessionID) { // if there is a sessionID
      resolve('true')
    } else { // if there is no sessionID
      resolve('false')
    }
  })
}