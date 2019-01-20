const express = require('express');

const pspricesController = require('../controllers/psprices');

const router = express.Router();

router.get('/fetch', pspricesController.fetchData);

router.get('/reigon/:id', pspricesController.filterRegion);

router.get('/platforms/:id', pspricesController.filterPlatforms);

module.exports = router;