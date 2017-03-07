var hbs = require('hbs');
var nav = require('../views/partials/navigation.hbs');
hbs.registerPartial('navigation', nav);

var data = require('../data.json');

exports.view = function(req, res) {
  var user = data.students[0];

  var groups = {};
  for (let courseId in user.groups) {
    groups[courseId] = { members : [] };
    for (let studentId of user.groups[courseId]) {
      let student = data.students.find(function(s) { return s.id === studentId; });
      student.url = '/course/' + courseId + '/peer/' + studentId;
      groups[courseId].members.push(student);
    }
    var course = data.courses.find(function(c) { return c.id === courseId });
    groups[courseId].name = course.name;
    groups[courseId].courseUrl = '/course/' + courseId;
  }

  res.render('my-groups', {
    title : 'My Groups',
    name : user.name,
    groups : groups
   });
};

exports.leaveGroup = function(req, res) {
  var courseId = req.body.courseId;
  var user = data.students[0];
  for (let studentId of user.groups[courseId]) {
    let student = data.students.find(function(s) { return s.id === studentId });
    let studentGroup = student.groups[courseId];
    studentGroup.splice(studentGroup.indexOf(user.id), 1);
  }
  user.groups[courseId] = [];
  res.redirect('/my-groups');
};
