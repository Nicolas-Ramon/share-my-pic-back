const express = require("express");
const router = express.Router({ mergeParams: true });

const PictureController = require('../controllers/picture-controller');

router.post("/", PictureController.create);
router.get("/", PictureController.getAll);
router.delete("/", PictureController.delete);
router.put("/:id", PictureController.update);

module.exports = router;