// middleware to make sure user isAdmin and a user
const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.user
  // check if there is a current user in the session and check if that user is an admin
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const err = new Error('This page can not be accessed by the current user')
    // err.status(401)
    res.send(err.message).status(401)
    next(err)
    res.redirect('/') // if not, rediect them to homepage
  }
}

// middleware to make sure a user, such as delete profile
const isSelf = (req, res, next) => {
  const userId = req.params.id
  // if user is authenticated in session check
  if (userId === req.user.id) {
    next()
  } else {
    const err = new Error('not a user')
    err.status(401)
    next(err)
    res.redirect('/') // if not, rediect them to homepage
  }
}

module.exports = {
  isAdminMiddleware,
  isSelf
}

// TODO: revisit the error handling
