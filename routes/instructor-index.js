var data = require('../data.json');

/* GET home page. */
exports.view = function(req, res) {
  var user = data.instructors[0];
  // Load data for each enrolled course
  var courses = [];
  for (let courseId in user.myCourses) {
    let course = data.courses.find(function(c) { return c.id === courseId; });
    course.url = '/course-settings/' + courseId;
    courses.push(course);
  }
  res.render('instructor-index', {
    title : 'Grouper',
    name : user.name,
    courses : courses
   });
};

exports.addCourse = function(req, res) { 
	var user = data.instructors[0];
  //TO-DO: add new course using user input??
	var newCourse = {
      "id" : "mno",
      "code" : "9g8zbW8a",
      "name" : "COGS 199",
      "title" : "Special Project",
      "groupSize" : 2,
      "students" : []
    };

	user.myCourses[newCourse.id] = [];

	res.redirect('/instructor-index');
 };

exports.removeCourse = function(req, res) {
  var courseId = req.body.id;
  var user = data.instructors[0];
  delete user.myCourses[courseId];
  res.redirect('/instructor-index');
};
