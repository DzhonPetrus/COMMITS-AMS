const pool = require ('./');

let courseDB = {};

courseDB.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM course`, (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

courseDB.findByCourseCode = (CourseCode) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM course WHERE courseCode = ?`, orgCode, (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

courseDB.create = (course) => {
  let {courseCode, title, orgCode} = course;
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO course(courseCode,title,orgCode) VALUES(?,?,?)`, [courseCode, title, orgCode], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

courseDB.update = (course) => {
  let {id, courseCode, title, orgCode} = course;
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE course SET courseCode=?, title=?, orgCode=? WHERE id=?`, [courseCode, title,orgCode, id], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

courseDB.delete = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM organization where id=?`, [id], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

module.exports = courseDB;
