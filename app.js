var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: 'public/images' });

var signin = require('./routes/signin');
var index = require('./routes/index');
var instructorIndex = require('./routes/instructor-index');
var myProfile = require('./routes/my-profile');
var myGroups = require('./routes/my-groups');
var course = require('./routes/course');
var peer = require('./routes/peer');
var data = require('./routes/data');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', signin.view);
app.post('/login', signin.login);
app.post('/register', signin.registerUser);
app.get('/index', index.view);
app.get('/instructor-index', instructorIndex.view);
app.post('/index/add-course', index.addCourse);
app.post('/index/remove-course', index.removeCourse);
app.get('/my-profile', myProfile.view);
app.post('/my-profile', upload.single('avatar'), myProfile.updateProfile);
app.get('/my-groups', myGroups.view);
app.post('/my-groups', myGroups.leaveGroup);
app.get('/course/:courseId', course.view);
app.get('/course/:courseId/peer/:peerId', peer.view);
app.post('/course/:courseId/peer/:peerId', peer.joinGroup);
app.get('/data', data.loadData);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
