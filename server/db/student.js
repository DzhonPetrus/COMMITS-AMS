const pool = require ('./');

let studentDB = {};

studentDB.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM student`, (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

studentDB.findByStudentNo = (studentNo) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM student WHERE studentNo = ?`, studentNo, (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

studentDB.create = (student) => {
  let {id, studentNo, firstName, middleName, lastName, courseCode, section, schoolYear} = student;
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO student(id, studentNo, firstName, middleName, lastName, courseCode, section, schoolYear) VALUES(?,?,?,?,?,?,?,?)`, [id, studentNo, firstName, middleName, lastName, courseCode, section, schoolYear], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

studentDB.update = (student) => {
  let {id, firstName, middleName, lastName, courseCode, section, schoolYear} = student;
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE student SET firstName=?, middleName=?, lastName=?, courseCode=?, section=?, schoolYear=? WHERE id=?`, [firstName, middleName, lastName, courseCode, section, schoolYear, id], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

studentDB.delete = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM student where id=?`, [id], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

module.exports = studentDB;
