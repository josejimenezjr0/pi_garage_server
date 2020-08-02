const Auth0Strategy = require("passport-auth0")
const { DOMAIN, CLIENT_ID, CLIENT_SECRET } = process.env;

module.exports = new Auth0Strategy(
  {
    domain:       DOMAIN,
    clientID:     CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
    scope: 'openid email profile'
  },
  async (accessToken, refreshToken, extraparams, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    const user = await new User({ googleId: profile.id }).save();
    done(null, user);
    }
)