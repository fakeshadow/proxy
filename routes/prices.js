const express = require('express');

const pspricesController = require('../controllers/psprices');

const router = express.Router();

router.get('/fetch', pspricesController.fetchData);

router.get('/prices/platforms/:id', pspricesController.filterPlatforms);
router.get('/prices/region/:id', pspricesController.filterRegion);

router.post('/price/filter', pspricesController.filterBoth);


module.exports = router;