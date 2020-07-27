const connection = require("../../db");
const util = require("util");
const queryAsync = util.promisify(connection.query).bind(connection);

class Favorite {

  static async create(favoriteData) {
    const query = "INSERT INTO favorite SET ?";
    return queryAsync(query, favoriteData);
  }

  static async getOne(filters) {
    const { user, picture } = filters;
    const query = `SELECT * FROM favorite 
                   WHERE user LIKE ${connection.escape(`${user}`)} 
                   AND picture LIKE ${connection.escape(`${picture}`)}`
    return await queryAsync(query);
  }

  static async delete(favoriteData) {
    const { user, picture } = favoriteData
    const query = `DELETE FROM favorite 
                   WHERE user = ${connection.escape(`${user}`)} 
                   AND picture = ${connection.escape(`${picture}`)}`;
    return await queryAsync(query);
  }

}

module.exports = Favorite;