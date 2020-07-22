const express = require("express");
const router = express.Router({ mergeParams: true });

const PictureController = require('../controllers/picture-controller');

router.post("/", PictureController.create)

module.exports = router;