var data = require('../data.json');
var shortid = require('shortid');

exports.view = function(req, res) {
  res.render('signin', { title : 'Welcome to Grouper' });
};

exports.login = function(req, res) {

  var user = data.students.find(function(s) { return s.email === req.body.email });
console.log(user);

  if (user) {
    if (data.students[0] !== user) {
      data.students.splice(data.students.indexOf(user), 1);
      data.students.splice(0, 0, user);
    }
    res.redirect('/index');
  } else {
    res.redirect('/');
  }
};

exports.registerUser = function(req, res) {
  var user = data.students.find(function(s) { return s.email === req.body.email });
  if (user) {
    res.redirect('/');
  } else {
    user = {
      id : shortid.generate(),
      name : req.body.name,
      email : req.body.email,
      groups : {},
      invites : {},
      avatar : 'default.png',
      major : '',
      year : '',
      location : '',
      availability : {
        Mon : [],
        Tues : [],
        Wed : [],
        Thurs : [],
        Fri : [],
        Sat : [],
        Sun : []
      },
      bio : '',
      roles : ''
    }
    data.students.splice(0, 0, user);

    res.redirect('/index');
  }
};
