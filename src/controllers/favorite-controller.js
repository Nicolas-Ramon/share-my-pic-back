const Favorite = require("../models/favorite-model");

class FavoriteController {
  // POST/favorite
  static async create(req, res, next) {
    const { user, picture } = req.body;

    const favoriteData = {
      user,
      picture,
    };

    try {
      const data = await Favorite.create(req.body);
      res.status(201).json({
        user,
        picture,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something bad happened...");
    }
  }

  // GET/favorite
  static async getOne(req, res, next) {
    try {
      const data = await Favorite.getOne(req.query);
      if (data.length === 0) {
        return res.status(404).send("Nothing found!");
      }
      res.status(201).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something bad happened...");
    }
  }

  // DELETE/favorite
  static async delete(req, res, next) {
    const { user, picture } = req.query;
    try {
      const data = await Favorite.delete(req.query);
      if (data.affectedRows === 0) {
        return res.status(404).send("No resource to delete");
      }
      res.status(204).send("Favorite correctly deleted");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something bad happened...");
    }
  }
}

module.exports = FavoriteController;
