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
require('./routes/userRoutes')(app);
app.get('/', (req, res) => {
  console.log('/ from main index');
  let adminContent = `
    <div>
      You don't appear to be logged in.  You can log in by visiting
      <a href="/login">the Authentication Route</a>. You could
      also look at details about yourself at <a href="/current_user">the Current User route</a>
    </div>
  `;
  if (req.user) {
    adminContent = `
      <div>
        You appear to be logged in, so you can visit <a href="/admins">the Admins route</a>
        or you can <a href="/logout">Logout</a>.
      </div>
    `;
  }
  res.send(`
    <div>
      <h4>Hi!  Welcome to the React SSR API</h4>
      <div>
        You can see <a href="/users">the Users route</a>
      </div>
      ${adminContent}
    </div>
  `);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`)
});
