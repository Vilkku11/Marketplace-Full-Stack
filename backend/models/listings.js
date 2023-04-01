const pool = require("../db/pool");

const listings = {
  findAll: () =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query("SELECT * FROM listings", (err, result) => {
          //connection.query("SHOW TABLES", (err, result) => {
          connection.release();
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    }),
};

module.exports = listings;
