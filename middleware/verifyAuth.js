const { AUTH_JJJ, AUTH_LEJ } = process.env;
const { unAuth } = require('../src/renderer')

const authorized = user => {
  console.log('AUTH_LEJ: ', AUTH_LEJ);
  console.log('AUTH_JJJ: ', AUTH_JJJ);
  console.log('user: ', user);
  return user.authId === AUTH_JJJ  || user === AUTH_LEJ
}

const verifyAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send(unAuth);
  }
  if(!authorized(req.user)) {
    return res.status(401).send(unAuth);  
  }
  next();
}

module.exports = {
  verifyAuth,
  authorized
}