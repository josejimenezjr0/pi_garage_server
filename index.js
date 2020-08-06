require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./models/User');
require('./services/passport');
// const requireLogin = require('./middlewares/requireLogin')

mongoose.connect(process.env.MONGOOSE, {useNewUrlParser:true, useUnifiedTopology: true })

const app = express()

const login = (req, res, next) => {
  !req.user && passport.authenticate('auth0', {})
  next();
}

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
//
app.use(login)

require('./routes/authRoutes')(app);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`)
});
