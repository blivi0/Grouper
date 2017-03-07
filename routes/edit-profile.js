var hbs = require('hbs');
var nav = require('../views/partials/navigation.hbs');
hbs.registerPartial('navigation', nav);

var data = require('../data.json');

exports.view = function(req, res) {
  var user = data.students[0];

  var days = [];
  for (let day in user.availability)
    days.push({ day : day, from : user.availability[day][0], to : user.availability[day][1] });

  res.render('edit-profile', {
    title : 'My Profile',
    name : user.name,
    major : user.major,
    avatar : user.avatar,
    days : days,
    bio : user.bio,
    roles : user.roles
   });
};

exports.updateProfile = function(req, res) {
  var user = data.students[0];
  if (req.file)
    user.avatar = req.file.filename;
  user.major = req.body.major;
  user.year = req.body.year;
  user.location = req.body.location;
  for (let day in user.availability)
    user.availability[day] = [req.body[day+'From'], req.body[day+'To']];
  user.bio = req.body.bio;
  user.roles = req.body.roles;

  res.redirect('my-profile');
};
