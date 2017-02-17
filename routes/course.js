var data = require('../data.json');

exports.view = function(req, res) {
  // Temporarily using first student as logged in user
  var user = data.students[0];
  // Load data for course
  var courseId = req.params.courseId;
  var course = data.courses.find(function(c) { return c.id === courseId; });
  // Load data for each student in the course
  var peers = [];
  for (let studentId of course.students) {
    if (studentId === user.id)
      continue;
    let student = data.students.find(function(s) { return s.id === studentId; });
    if (student.groups[courseId].length + 1 === course.groupSize)
      continue;
    let peer = {
      id : student.id,
      name : student.name,
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
  res.render('course', {
    title : courseId,
    peers : peers
   });
};
