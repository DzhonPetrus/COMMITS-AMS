const express = require('express');
const cors = require('cors');

const apiUser = require('./routes/userController');

const apiOrg = require('./routes/orgController');
const apiCourse = require('./routes/courseController');
const apiStudent = require('./routes/studentController');

const apiEvent = require('./routes/eventController');
const apiAttendance = require('./routes/attendanceController');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/user', apiUser);

app.use('/api/org', apiOrg);
app.use('/api/course', apiCourse);
app.use('/api/student', apiStudent);

app.use('/api/event', apiEvent);
app.use('/api/attendance', apiAttendance);

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


global.generateID = () => '_' + (Date.now().toString(36) + Math.random().toString(36)).substr(2, 9);

