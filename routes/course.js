var data = require('../data.json');

exports.view = function(req, res) {
  // Temporarily using first student as logged in user
  var user = data.students[0];
  // Load data for course
  var courseId = req.params.courseId;
  var course = data.courses.find(function(c) { return c.id === courseId });
  // Load data for each student in the course
  var peers = [];
  for (let studentId of course.students) {
    if (studentId === user.id)
      continue;
    let student = data.students.find(function(s) { return s.id === studentId });
    let peer = {
      name : student.name,
      description : 'description',
      url : encodeURI('/course/' + courseId + '/peer/' + studentId),
      groupStatus : (student.groups[courseId].length + 1) + '/' + course.groupSize
    };
    peers.push(peer);
  }
  res.render('course', {
    title : courseId,
    peers : peers
   });
};
