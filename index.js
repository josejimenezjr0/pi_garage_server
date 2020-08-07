require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
require('./models/User');
require('./passport');

mongoose.connect(process.env.MONGOOSE, {useNewUrlParser:true, useUnifiedTopology: true })

const app = express()

app.use(cors());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secret: process.env.COOKIE_SECRET
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/routes')(app);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`)
});
