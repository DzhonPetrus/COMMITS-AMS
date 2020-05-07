const pool = require ('./');

let attendanceDB = {};

attendanceDB.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM attendance`, (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

attendanceDB.findById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM attendance WHERE ID = ?`, id, (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

attendanceDB.timeIn = (attendance) => {
  let {id, eventId, studentNo} = attendance;
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO attendance(id, eventId, studentNo) VALUES(?,?,?)`, [id, eventId, studentNo], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

attendanceDB.timeOut = (attendance) => {
  let {id} = attendance;
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE attendance SET timeOut=CURRENT_TIME() WHERE id=?`, [id], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

attendanceDB.delete = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM attendance where id=?`, [id], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

module.exports = attendanceDB;
