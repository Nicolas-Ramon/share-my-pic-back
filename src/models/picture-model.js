const connection = require("../../db");
const util = require("util");
const queryAsync = util.promisify(connection.query).bind(connection);

class Picture {

  static async create(pictureData) {
    const query = "INSERT INTO picture SET ?";
    return queryAsync(query, pictureData);
  }

  static async getAll(filters) {
    let query = "SELECT * FROM picture";
    if (filters) {
      const { title, user_id } = filters;
      if (title && user_id) {
        query += ` WHERE title LIKE ${connection.escape(`%${title}%`)}
                   AND user_id LIKE ${connection.escape(`%${user_id}%`)}`;
      } else if (title) {
        query += ` WHERE title LIKE ${connection.escape(`%${title}%`)}`;
      } else if (user_id) {
        query += ` WHERE user_id LIKE ${connection.escape(`%${user_id}%`)}`;
      }
    }
    return await queryAsync(query);
  }

}

module.exports = Picture;