const Picture = require("../models/picture-model");

class PictureController {

  // POST/picture
  static async create(req, res, next) {
    const { title, url, date, idUser } = req.body;
    if (!title || !url || !date || !idUser) {
      return res.status(403).send("Please provide all the fields!");
    }

    const pictureData = {
      title,
      url,
      date,
      user_id: idUser,
    };

    try {
      const data = await Picture.create(pictureData);
      res.status(201).json({
        id: data.insertId,
        title,
        url,
        date,
        user_id: idUser,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send('Something bad happened...');
    }
  }

  // GET/picture
  static async getAll(req, res, next) {
    try {
      const data = await Picture.getAll(req.query);
      if (data.length === 0) {
        return res.status(404).send("Nothing found!");
      }
      res.status(201).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).send('Something bad happened...');
    }
  }

}

module.exports = PictureController;
