var data = require('../data.json');
var shortid = require('shortid');

exports.view = function(req, res) {
  res.render('signin', { title : 'Welcome to Grouper', loginFailed : false });
};

exports.login = function(req, res) {
  var user;
  if (user = data.students.find(function(s) { return s.email === req.body.email })) {
    if (data.students[0] !== user) {
      data.students.splice(data.students.indexOf(user), 1);
      data.students.splice(0, 0, user);
    }
    res.redirect('/index');
  }
  else if (user = data.instructors.find(function(i) { return i.email === req.body.email })) {
    if (data.instructors[0] !== user) {
      data.instructors.splice(data.instructors.indexOf(user), 1);
      data.instructors.splice(0, 0, user);
    }
    res.redirect('/instructor-index');
  }
  else {
    res.render('signin', { title : 'Welcome to Grouper', loginFailed : true });
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
      avatar : 'grouper-gray.png',
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
