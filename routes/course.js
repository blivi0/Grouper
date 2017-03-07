var hbs = require('hbs');
var nav = require('../views/partials/navigation.hbs');
hbs.registerPartial('navigation', nav);

var data = require('../data.json');

function getPageData(courseId) {
  // Temporarily using first student as logged in user
  var user = data.students[0];
  // Load data for course
  // var courseId = req.params.courseId;
  var course = data.courses.find(function(c) { return c.id === courseId; });
  // Load data for each student in the course
  var peers = [];
  for (let studentId of course.students) {
    if (studentId === user.id)
      continue;
    let student = data.students.find(function(s) { return s.id === studentId; });
    if (student.groups[courseId].length + 1 === course.groupSize ||
      student.groups[courseId].indexOf(user.id) !== -1)
      continue;
    let peer = {
      id : student.id,
      name : student.name,
      avatar : student.avatar,
      major : student.major,
      year : student.year,
      location : student.location,
      url : encodeURI('/course/' + courseId + '/peer/' + studentId),
      groupStatus : course.groupSize - (student.groups[courseId].length + 1),
      year : student.year,
      location : student.location
    };
    peers.push(peer);
  }
  // res.render('course', {
  //   title : course.name,
  //   groupSize : course.groupSize,
  //   peers : peers
  //  });
  return {
    title : course.name,
    groupSize : course.groupSize,
    peers : peers
  };
};

exports.view_A = function(req, res) {
  var pageData = getPageData(req.params.courseId);
  pageData.view_A = true;
  res.render('course', pageData);
};

exports.view_B = function(req, res) {
  var pageData = getPageData(req.params.courseId);
  pageData.view_A = false;
  res.render('course', pageData);
};
