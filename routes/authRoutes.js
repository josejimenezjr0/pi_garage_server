const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin')
const axios = require('axios')
const { IPROUTE } = process.env;

module.exports = app => {
  app.get(
    '/login',
    passport.authenticate('auth0', {}),
    (req, res) => {
      console.log('/login')
    }
  );

  app.get(
    '/api/login/callback',
    passport.authenticate('auth0', { failureRedirect: '/login', failureFlash: true
    }),
    (req, res) => {
      console.log('/api/login/callback')
      res.redirect('/')
    }
  );

  app.get('/logout', (req, res) => {
    console.log('/logout')
    req.logout();
    res.redirect('/')
  });

  app.get('/current_user', requireLogin, (req, res) => {
    console.log('/current_user')
    res.send(req.user);
  });

  app.get('/auth_blink', requireLogin, (req, res) => {
    console.log('/auth_blink')
    axios.get(`${IPROUTE}/blink`)
      .then(res => {
        console.log('Yay, blink?')
      })
      .catch(err => {
        console.log(err);
      })
    res.redirect('/')
  });

  app.get('/auth_on', requireLogin, (req, res) => {
    console.log('/auth_on')
    axios.get(`${IPROUTE}/led_on`)
      .then(res => {
        console.log('Yay, on?')
      })
      .catch(err => {
        console.log(err);
      })
    res.redirect('/')
  });

  app.get('/auth_off', requireLogin, (req, res) => {
    console.log('/auth_off')
    axios.get(`${IPROUTE}/led_off`)
      .then(res => {
        console.log('Yay, off?')
      })
      .catch(err => {
        console.log(err);
      })
    res.redirect('/')
  });
};
