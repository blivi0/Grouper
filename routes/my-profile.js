var hbs = require('hbs');
var nav = require('../views/partials/navigation.hbs');
hbs.registerPartial('navigation', nav);

var data = require('../data.json');

exports.view = function(req, res) {
  var user = data.students[0];

  var days = [];
  for (let day in user.availability)
    days.push({ day : day, from : user.availability[day][0], to : user.availability[day][1] });

  res.render('my-profile', {
    title : user.name,
    name : user.name,
    avatar : user.avatar,
    major : user.major,
    year : user.year,
    location : user.location,
    days : days,
    bio : user.bio,
    roles : user.roles,
  });
};