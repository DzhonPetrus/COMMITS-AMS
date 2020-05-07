const pool = require ('./');

let eventDB = {};

eventDB.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM event`, (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

eventDB.findById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM event WHERE ID = ?`, id, (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

eventDB.create = (event) => {
  let {id, title, description, _date} = event;
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO event(id,title,description,_date) VALUES(?,?,?,?)`, [id, title, description, _date], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

eventDB.update = (event) => {
  let {id, title, description, _date} = event;
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE event SET title=?, description=?, _date=? WHERE id=?`, [title, description, _date, id], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

eventDB.delete = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM event where id=?`, [id], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

module.exports = eventDB;
