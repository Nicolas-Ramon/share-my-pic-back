const connection = require("../../db");
const util = require("util");
const queryAsync = util.promisify(connection.query).bind(connection);

class Picture {

  static async create(pictureData) {
    const query = "INSERT INTO picture SET ?";
    return queryAsync(query, pictureData);
  }

  static async getAll(filters) {
    let query = "SELECT * FROM picture ORDER BY date DESC";
    if (filters) {
      const { title, user_id, id } = filters;
      if (title && user_id) {
        query = `SELECT * FROM picture 
                WHERE title LIKE ${connection.escape(`%${title}%`)} 
                AND user_id LIKE ${connection.escape(`${user_id}`)}
                ORDER BY date DESC`;
      } else if (title) {
        query = `SELECT * FROM picture 
                WHERE title LIKE ${connection.escape(`%${title}%`)} 
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

}

module.exports = Picture;