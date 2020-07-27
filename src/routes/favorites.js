const express = require("express");
const router = express.Router({ mergeParams: true });

const FavoriteController = require('../controllers/favorite-controller');

router.post("/", FavoriteController.create);
router.get("/", FavoriteController.getOne);
router.delete("/", FavoriteController.delete);

module.exports = router;