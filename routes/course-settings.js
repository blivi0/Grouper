var data = require('../data.json');

function loadCourse(courseId) {
  var course = data.courses.find(function(c) { return c.id === courseId; });

  return {
    title : 'Course Settings',
    id : course.id,
    pw : course.pw,
    name : course.name,
    title : course.title,
    groupSize : course.groupSize,
    students : course.studentNames
  };
};


exports.view = function(req, res) {
  var courseData = loadCourse(req.params.courseId);
  res.render('course-settings', courseData);
};
