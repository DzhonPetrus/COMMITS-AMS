const pool = require ('./');

let userDB = {};

userDB.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM _user`, (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

userDB.findById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM _user WHERE ID = ?`, id, (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

userDB.create = (user) => {
  let {id, username, password, _role} = user;
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO _user(id,username,password,_role) VALUES(?,?,?,?)`, [id, username, password, _role], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

userDB.update = (user) => {
  let {id, username, password, _role} = user;
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE _user SET username=?, password=?, _role=? WHERE id=?`, [username, password, _role, id], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

userDB.delete = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM _user where id=?`, [id], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

userDB.exist = (username,password) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM _user where username=? AND password=?`, [username,password], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

module.exports = userDB;
