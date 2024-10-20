const express = require('express');
const { getAllAnimes, storeAnime, getAnime } = require('../controllers/animes');
const multer = require('multer');
const diskStorage = require('../fileupload/multerupload');
const upload = multer({ storage: diskStorage }) 

const router = express.Router();
router.route("/").get(getAllAnimes).post(upload.array(), storeAnime);
router.route("/:id").get(getAnime);

module.exports = router