const express = require('express');
const { register, login } = require('../controllers/auth');
const multer = require('multer');
const validateData = require('../middleware/validation');
const userLoginSchema = require('../schema/userSchema');
const router = express.Router();
const upload = multer()

router.post('/register', upload.array(), register)
router.post('/login', upload.array(), validateData(userLoginSchema), login)

module.exports = router