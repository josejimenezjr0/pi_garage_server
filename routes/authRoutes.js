const passport = require('passport');
const axios = require('axios')
const { IPROUTE, AUTH_JJJ, AUTH_LEJ } = process.env;

const requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('<a href="/login">login</a>');
  }
  next();
}

const verify = (req, res, next) => {
  if(!(req.user.authId == AUTH_JJJ || req.user.authId == AUTH_LEJ)) {
    return res.status(401).send('<a href="/login">LOGIN</a>');  
  }
  next()
}

module.exports = app => {
  app.get('/', (req, res) => {
    let auth = req.user && (req.user.authId === AUTH_JJJ  || req.user.authId === AUTH_LEJ) ? 
      `<div>
        <a href="/auth_blink">Blink</a></br>
        <a href="/auth_on">On</a></br>
        <a href="/auth_off">Off</a></br>
        <a href="/logout">Logout</a>
      </div>`
      :
      `<a href="/login">Login!</a>`
    
    res.send(`<div>${auth}</div>`)
  })

  app.get('/login', passport.authenticate('auth0', {}));

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

  app.get('/current_user', requireLogin, verify, (req, res) => {
    console.log('/current_user')
    res.send(req.user);
  });

  app.get('/auth_blink', requireLogin, verify, (req, res) => {
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

  app.get('/auth_on', requireLogin, verify, (req, res) => {
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

  app.get('/auth_off', requireLogin, verify, (req, res) => {
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
