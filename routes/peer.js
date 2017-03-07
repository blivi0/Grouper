var hbs = require('hbs');
var nav = require('../views/partials/navigation.hbs');
hbs.registerPartial('navigation', nav);

var data = require('../data.json');

exports.view = function(req, res) {
  var user = data.students[0];

  var courseId = req.params.courseId;
  var course = data.courses.find(function(c) { return c.id === courseId; });

  var peerId = req.params.peerId;
  var peer = data.students.find(function(s) { return s.id === peerId; });

  var days = [];
  for (let day in peer.availability) {
    if (peer.availability[day].length > 0)
      days.push({ day : day, from : peer.availability[day][0], to : peer.availability[day][1] });
  }

  var members = [];
  for (let studentId of peer.groups[courseId]) {
    let member = data.students.find(function(s) { return s.id === studentId; });
    member.url = member.id !== user.id ? '/course/' + courseId + '/peer/' + studentId : '/my-profile';
    members.push(member);
  }

  res.render('peer', {
    title : peer.name,
    id : peerId,
    name : peer.name,
    avatar : peer.avatar,
    major : peer.major,
    year : peer.year,
    location : peer.location,
    days : days,
    bio : peer.bio,
    roles : peer.roles,
    mailto : 'mailto:' + peer.email,
    members : members,
    courseId : courseId,
    courseName : course.name,
    courseUrl : encodeURI('/course/' + courseId)
  });
};

exports.joinGroup = function(req, res) {
  var courseId = req.params.courseId;
  var peerId = req.params.peerId;
  var user = data.students[0];
  var peer = data.students.find(function(s) { return s.id === peerId });

  var newGroup = user.groups[courseId].concat(peer.groups[courseId], user.id, peer.id);
  for (let studentId of newGroup) {
    let member = data.students.find(function(s) { return s.id === studentId; });
    let newGroupCopy = JSON.parse(JSON.stringify(newGroup));
    newGroupCopy.splice(newGroupCopy.indexOf(member.id), 1);
    member.groups[courseId] = newGroupCopy;
  }

  var members = [];
  for (let studentId of peer.groups[courseId]) {
    let member = data.students.find(function(s) { return s.id === studentId; });
    member.url = member.id !== user.id ? '/course/' + courseId + '/peer/' + studentId : '/my-profile';
    members.push(member);
  }
  res.json(members);
};
