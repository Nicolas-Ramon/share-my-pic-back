const connection = require("../../db");
const util = require("util");
const queryAsync = util.promisify(connection.query).bind(connection);

class Picture {

  static async create(pictureData) {
    const query = "INSERT INTO picture SET ?";
    return queryAsync(query, pictureData);
  }

  static async getAll(filters) {
    let query = `SELECT p.id, title, url, date, user_id, name, req.nblike
                 FROM picture AS p
                 JOIN user AS u
                 ON p.user_id = u.id
                 LEFT JOIN (SELECT picture AS pic, COUNT(user) AS nblike FROM favorite GROUP BY picture) AS req
                 ON p.id = req.pic
                 ORDER BY date DESC`;

    if (filters) {
      const { title, name, user_id, id } = filters;
      if (title && name) {
        query = `SELECT p.id, title, url, date, user_id, name, req.nblike
                 FROM picture AS p
                 JOIN user AS u
                 ON p.user_id = u.id
                 LEFT JOIN (SELECT picture AS pic, COUNT(user) AS nblike FROM favorite GROUP BY picture) AS req
                 ON p.id = req.pic
                 WHERE title LIKE ${connection.escape(`%${title}%`)} 
                 AND name LIKE ${connection.escape(`%${name}%`)}
                 ORDER BY date DESC`;
      } else if (title) {
        query = `SELECT p.id, title, url, date, user_id, name, req.nblike
                 FROM picture AS p
                 JOIN user AS u
                 ON p.user_id = u.id
                 LEFT JOIN (SELECT picture AS pic, COUNT(user) AS nblike FROM favorite GROUP BY picture) AS req
                 ON p.id = req.pic 
                 WHERE title LIKE ${connection.escape(`%${title}%`)} 
                 ORDER BY date DESC`;
      } else if (name) {
        query = `SELECT p.id, title, url, date, user_id, name, req.nblike
                 FROM picture AS p
                 JOIN user AS u
                 ON p.user_id = u.id
                 LEFT JOIN (SELECT picture AS pic, COUNT(user) AS nblike FROM favorite GROUP BY picture) AS req
                 ON p.id = req.pic  
                 WHERE name LIKE ${connection.escape(`%${name}%`)} 
                 ORDER BY date DESC`;
      } else if (user_id) {
        query = `SELECT * FROM picture 
                 WHERE user_id LIKE ${connection.escape(`${user_id}`)}
                 ORDER BY date DESC`;
      } else if (id) {
        query = `SELECT * FROM picture 
                 WHERE id LIKE ${connection.escape(`${id}`)}`;
      }
    }
    return await queryAsync(query);
  }

  static async delete(id) {
    const query = "DELETE FROM picture WHERE id = ?";
    return await queryAsync(query, id);
  }

  static async update(pictureData) {
    const query = "UPDATE picture SET ? WHERE id = ?";
    return await queryAsync(query, pictureData);
  }

}

module.exports = Picture;