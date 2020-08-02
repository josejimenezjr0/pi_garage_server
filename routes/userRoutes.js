const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.get('/users', (req, res) => {
    console.log('USER ROUTE FILE /users');
    res.send(users);
  });

  app.get('/admins', requireLogin, (req, res) => {
    console.log('USER ROUTE FILE /admins')
    res.send(admins);
  });
};

const users = [
  { id: 1, name: 'Leanne Graham' },
  { id: 2, name: 'Ervin Howell' },
  { id: 3, name: 'Clementine Bauch' },
  { id: 4, name: 'Patricia Lebsack' },
  { id: 5, name: 'Chelsey Dietrich' }
];

const usersXss = [
  { id: 1, name: '</script><script>alert(1234567890)</script>' },
  { id: 2, name: 'Ervin Howell' },
  { id: 3, name: 'Clementine Bauch' },
  { id: 4, name: 'Patricia Lebsack' },
  { id: 5, name: 'Chelsey Dietrich' }
];

const admins = [
  { id: 1, name: 'Kurtis Weissnat' },
  { id: 2, name: 'Nicholas Runolfsdottir' },
  { id: 3, name: 'Gelann Reichert' },
  { id: 4, name: 'Moriah Stanton' },
  { id: 5, name: 'Rey Padberg' }
];
