var hbs = require('hbs');
var nav = require('../views/partials/navigation.hbs');
hbs.registerPartial('navigation', nav);

var data = require('../data.json');

/* GET home page. */
exports.view = function(req, res) {
  // Temporarily using first student as logged in user
  var user = data.students[0];
  // Load data for each enrolled course
  var courses = [];
  for (let courseId in user.groups) {
    let course = data.courses.find(function(c) { return c.id === courseId; });
    course.url = '/course/' + courseId;
    courses.push(course);
  }
  res.render('index', {
    title : 'Grouper',
    name : user.name,
    courses : courses
   });
};

exports.addCourse = function(req, res) { 
	var user = data.students[0];

	var newCourse = {
      "id" : "jkl",
      "name" : "CSE 190",
      "title" : "Entrepreneurship",
      "groupSize" : 2,
      "students" : ["000", "123", "456", "789", "111", "222", "333", "444", "555", "666"]
    };

	user.groups[newCourse.id] = [];
	// user.invites[newCourse.id] = [];

	res.redirect('/index');
 };

exports.removeCourse = function(req, res) {
  var courseId = req.body.id;
  var user = data.students[0];
  delete user.groups[courseId];
  delete user.invites[courseId];
  res.redirect('/index');
};
