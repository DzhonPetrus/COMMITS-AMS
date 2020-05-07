const pool = require ('./');

let orgDB = {};

orgDB.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM organization`, (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

orgDB.findByOrgCode = (orgCode) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM organization WHERE orgCode = ?`, orgCode, (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

orgDB.create = (org) => {
  let {orgCode, title} = org;
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO organization(orgCode,title) VALUES(?,?)`, [orgCode, title], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

orgDB.update = (org) => {
  let {id, orgCode, title} = org;
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE organization SET orgCode=?, title=?, WHERE id=?`, [orgCode, title, id], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

orgDB.delete = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM organization where id=?`, [id], (err, results) => {
      if(err)
        return reject(err);
      return resolve(results);
    });
  });
};

module.exports = orgDB;
