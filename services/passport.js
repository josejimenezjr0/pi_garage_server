const passport = require('passport');
const mongoose = require('mongoose');
const Auth0Strategy = require("passport-auth0")
const { DOMAIN, CLIENT_ID, CLIENT_SECRET } = process.env;

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new Auth0Strategy(
  {
    domain:       DOMAIN,
    clientID:     CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: '/api/login/callback',
    scope: 'openid email profile',
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, extraparams, profile, done) => {
    const existingUser = await User.findOne({ authId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    const user = await new User({ authId: profile.id, profileRAW: profile._raw }).save();
    done(null, user);
    }
  )
);
