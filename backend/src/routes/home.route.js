const express = require('express');
const router = express.Router();

const utils = require('../utils/functions');
const homeController = require('../controllers/home.controller');
const weatherController = require('../controllers/weather.controller');

const app = express();

router.get('/', homeController.get);

router.post('/', homeController.get);

router.put('/', homeController.get);

router.patch('/', homeController.get);

router.delete('/', homeController.get);

module.exports = router;
