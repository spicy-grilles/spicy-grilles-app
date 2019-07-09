const passport = require('passport');

require('./serializers');
require('./localStrategy');

module.exports = (app)  => {
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.playerON = req.user
    }
    next()
  })
}
