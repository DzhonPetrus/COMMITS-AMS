# COMMITS - ATTENDANCE MONITORING SYSTEM

## DESIGN

### DATABASE

#### User
- id
- username
- password
- role

#### Student
- id
- studentNo
- fullName
- course
- section
- s.y
- isActive

#### Organization
- id
- orgCode
- title

#### Course
- id
- courseCode
- title
- orgCode

#### Event
- id
- title
- description
- course
- date

#### Attendance
- id
- eventId
- studentNo
- timeIn
- timeOut

P.S: varchar id is auto generated string instead of auto increment to avoid overlaps


#### DATABASE QUERY (MySQL)
    CREATE DATABASE COMMITS_AMS;
    USE COMMITS_AMS;
    CREATE TABLE user(
       id varchar(11) primary key not null,
       username varchar(25) unique not null,
       password varchar(50) not null,
       role enum('SuperAdmin', 'Org', 'ReadOnly')    
    );
    CREATE TABLE organization (
       id int primary key auto_increment,
       orgCode varchar (20) unique not null,
       title varchar (100) unique not null
    );
    CREATE TABLE course(
       id int primary key auto_increment,
       courseCode varchar (20) unique not null,
       title varchar(100) unique not null,
       orgCode varchar (20) not null,
       FOREIGN KEY (orgCode) REFERENCES organization (orgCode)
    );
    CREATE TABLE student(
        id varchar(11) primary key,
        studentNo varchar(20) unique not null,
        firstName varchar(30) not null,
        middleName varchar(30),
        lastName varchar(30) not null,
        courseCode varchar (20) not null,
        section int not null,
        schoolYear int not null,
	isActive boolean default TRUE,
        FOREIGN KEY (courseCode) REFERENCES course(courseCode)
    );
    CREATE TABLE event(
       id varchar(11) primary key,
       title varchar(50) not null,
       description tinytext,
       _date DATE
    );
    CREATE TABLE attendance(
       id varchar (11) primary key,
       eventId varchar(11) not null,
       studentNo varchar (20) not null,
       timeIn TIME DEFAULT CURRENT_TIME(),
       timeOut TIME ON UPDATE CURRENT_TIME(),
       FOREIGN KEY (eventId) REFERENCES event(id),
       FOREIGN KEY (studentNo) REFERENCES student(studentNo)
    );

    INSERT INTO user(username, password, role) VALUES('ADMIN', 'ADMIN', 0);


    INSERT INTO organization(orgCode, title) VALUES ('COMMITS','COMMONWEALTH INFORMATION TECHNOLOGY SOCIETY');
    INSERT INTO course(courseCode, title) VALUES ('BSIT','Bachelor of Science in Information Technology', 'COMMITS');


    INSERT INTO organization(orgCode, title) VALUES ('CHRS','COMMUNITY OF HUMAN RESOURCE STUDENTS');
    INSERT INTO course(courseCode, title) VALUES ('BSBA-HRM','Bachelor of Science in Business Administration major in Human Resource Development', 'CHRS');


    INSERT INTO organization(orgCode, title) VALUES ('JMS','JUNIOR MARKETING SOCIETY');
    INSERT INTO course(courseCode, title) VALUES ('BSBA-MM','Bachelor of Science in Business Administration major in Marketing Management', 'JMS');


    INSERT INTO organization(orgCode, title) VALUES ('DOMT','DISTINGUISHED ORGANIZATION OF MANAGEMENT TECHNOLOGY');
    INSERT INTO course(courseCode,title) VALUES ('DOMT', 'Diploma in Office Management Technology');

    INSERT INTO organization(orgCode, title) VALUES ('FBTO','FUTURE BUSINESS TEACHERS ORGANIZATION');
    INSERT INTO course(courseCode, title) VALUES ('BBTE','Bachelor of Business Teacher Education', 'FBTO');

    INSERT INTO organization(orgCode, title) VALUES('YES", 'Youth Entrepreneurial Society');
    INSERT INTO course(courseCode, title) VALUES ('BSENT','Bachelor of Science in Entrepreneurial Management', 'YES');





### API [ /api ]

#### User [ /api/user ] 
- / 
   - GET  -> Get all user
- /:id
   - GET -> Get user by id
   - PATCH -> Update user
   - DELETE -> Delete a user
- /register
   - POST -> Create new user
- /exist
   - POST -> Check if account exist

#### ORGANIZATION [ /api/org ]
- /
   - GET -> Get all organization
   - POST -> Create new organization
- /:id
   - PATCH -> Update a organization
   - DELETE -> Delete a organization

#### COURSE [ /api/course ]
- /
   - GET -> Get all courses
   - POST -> Create new course
- /:id
   - PATCH -> Update a course
   - DELETE -> Delete a course

#### STUDENT [ /api/student ]
- /
   - GET -> Get all students
   - POST -> Create new student
- /:StudentNo
   - GET -> Get student by Student No
   - PATCH -> Update student
- /course/:CourseCode   
   - GET -> Get all students by Course

#### EVENT [ /api/event ]
- /
   - GET -> Get all events
   - POST -> Create new event
- /:id
   - PATCH - Update course
   - DELETE - Delete a course

#### ATTENDANCE [ /api/attendance ]
- /
   - GET -> Get all Attendance
   - POST -> Create new attendance
- /:id
   - PATCH - Update attendance
   - DELETE - Delete attendance
  
### FLOW

#### Login

    Switch(role)
       SuperAdmin:
          CRUD (All)
       Org:
           CRUD (Org)
       OSAS/SSC:
            Read (All)

#### Student
- Add student -> Generate QR & ID
 
#### Sorting
- Students 
   - by course & section
   - by course
   - by last name
   - by student no
- Event
   - all event by month
   - event by id

#### Attendance 
- (Time in)
- (Time out)

### DATA TABLE CONSTRAINTS
#### ORG
- Student (Create, Read, Update)
- Event (Create, Read, Update)
- Attendance (Create, Read, Update via Front-End QR Scanner)

#### SUPERADMIN
- CRUD FOR EVERYTHING
