const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const schedule = require('./util/schedule');

const priceRouter = require('./routes/prices');
const errorController = require('./controllers/error');

require('dotenv').config();

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(priceRouter);

app.use(errorController.get404);

mongoose
    .connect(process.env.DATABASE, { useNewUrlParser: true })
    .then(res => {
        schedule.scheduleJob();
        app.listen(process.env.PORT || 3000, () => console.log('Listening on port: ', process.env.PORT || 3000))
    })
    .catch(err => console.log(err))


