const passport = require('passport');

module.exports = app => {
  app.get(
    '/login',
    passport.authenticate('auth0', {}),
    (req, res) => {
      console.log('/login')
    }
  );

  app.get(
    '/login/callback',
    passport.authenticate('auth0'),
    (req, res) => {
      console.log('/login/callback')
      res.redirect('/users');
    }
  );

  app.get(
    '/api/login/callback',
    passport.authenticate('auth0', { failureRedirect: '/login', failureFlash: true
    }),
    (req, res) => {
      console.log('/api/login/callback')
      res.redirect(process.env.LHREDIRECT);
    }
  );

  app.get('/logout', (req, res) => {
    console.log('/logout')
    req.logout();
    res.redirect('/');
  });

  app.get('/current_user', (req, res) => {
    console.log('/current_user')
    res.send(req.user);
  });
};
