module.exports = function checkSession(req, res) { // check for active session
  return new Promise((resolve, reject) => {
    if (req.session.sessionID) {
      resolve('true')
    } else {
      resolve('false')
    }
  })
}