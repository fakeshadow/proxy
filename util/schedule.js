const schedule = require('node-schedule');
const pspricesController = require('../controllers/psprices')

//fetch new deals everyday
 schedule.scheduleJob('33 33 2 * * *', () => {
     console.log('Fetch new deals!');
     pspricesController.fetchData();
 })


module.exports = schedule;