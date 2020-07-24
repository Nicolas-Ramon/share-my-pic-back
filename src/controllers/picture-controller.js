const Picture = require("../models/picture-model");

class PictureController {

  // POST/picture
  static async create(req, res, next) {
    const { title, url, date, user_id } = req.body;
    if (!title || !url) {
      return res.status(403).send("Please provide all the fields!");
    }

    const pictureData = {
      title,
      url,
      date,
      user_id,
    };

    try {
      const data = await Picture.create(pictureData);
      res.status(201).json({
        id: data.insertId,
        title,
        url,
        date,
        user_id,
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

  // DELETE/picture/:id
  static async delete(req, res, next) {
    const { id } = req.query;
    try {
      const data = await Picture.delete(id);
      if (data.affectedRows === 0) {
        return res.status(404).send('No resource to delete at this id');
      }
      res.status(204).send('Pic correctly deleted');
    } catch (err) {
      console.log(err);
      return res.status(500).send('Something bad happened...');
    }
  }

  // PUT/picture/:id
  static async update(req, res, next) {
    const { id } = req.params;
    const { title, url } = req.body;
    try {
      if (!title && !url) {
        return res.status(403).send("Please provide at least one field!");
      }
      await Picture.update([req.body, id]);
      res.status(201).json({ id: id, ...req.body });
    } catch (err) {
      console.log(err);
      return res.status(500).send('Something bad happened...');
    }
  }

}

module.exports = PictureController;
