const Authorizer = (...permittedRoles) => {
    return (req, res, next) => {
      const { user } = req
      if (user && permittedRoles.includes(user.role)) {
        next();
      } else {
        res.status(403).end("Forbidden");
      }
    }
  }

module.exports = Authorizer