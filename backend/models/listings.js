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
  findByListing: (listing) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        const selectQuery =
          "SELECT * FROM listings WHERE name LIKE ? AND price LIKE ?;";
        connection.query(
          selectQuery,
          [listing.name, listing.price],
          (err, result) => {
            connection.release();
            if (err) {
              return reject(err);
            }
            resolve(result);
          }
        );
      });
    }),
  create: (listing) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        const query = connection.query(
          "INSERT INTO listings SET ?;",
          listing,
          (err, result) => {
            connection.release();
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    }),
};

module.exports = listings;
