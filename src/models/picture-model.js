const connection = require("../../db");
const util = require("util");
const queryAsync = util.promisify(connection.query).bind(connection);

class Picture {

  static async create(pictureData) {
    const query = "INSERT INTO picture SET ?";
    return queryAsync(query, pictureData);
  }

}

module.exports = Picture;