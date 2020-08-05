require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./models/User');
require('./services/passport');

mongoose.connect(process.env.MONGOOSE, {useNewUrlParser:true, useUnifiedTopology: true })

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // keys: [keys.cookieKey]
    secret: process.env.COOKIE_SECRET
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
app.get('/', (req, res) => {
  let auth = req.user ? 
    `<div>
      <p>Ok, I trust you now...</p>
      <a href="/auth_blink">Blink it</a>
      </br>
      <a href="/auth_on">Turn it on</a>
      </br>
      <a href="/auth_off">Turn it off</a>
      <p>Or you can leave...</p>
      <a href="/logout">Logout :(</a>
    </div>`
    :
    `<a href="/login">Make it blink!</a>`
  
  res.send(`<div>${auth}</div>`)
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`)
});
