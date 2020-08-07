const passport = require('passport');
const axios = require('axios')
const { verifyAuth, authorized } = require('../middleware/verifyAuth')
const { home, unAuth, ends } = require('../src/renderer')
const { IPROUTE } = process.env;

module.exports = app => {
  app.get('/', (req, res) => res.send(req.user && authorized(req.user) ? home : unAuth))

  app.get(ends.login, passport.authenticate('auth0', {}))

  app.get('/api/login/callback',
    passport.authenticate('auth0', { failureRedirect: '/login', failureFlash: true
    }),
    (req, res) => {
      res.redirect('/')
    }
  )

  app.get(ends.logout, (req, res) => {
    req.logout();
    res.redirect('/')
  });

  app.get('/api/:action', verifyAuth, (req, res) => {
    axios.get(`${IPROUTE}/${req.params.action}`)
      .catch(err => {
        console.log(err);
      })
    res.redirect('/')
  });
};
