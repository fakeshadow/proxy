const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;

const priceRouter = require('./routes/prices');
const errorController = require('./controllers/error');

require('dotenv').config();

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(priceRouter);

app.use(errorController.get404);

mongoConnect(() => {
    app.listen(process.env.PORT || 3000, () => console.log('Listening on port: ', process.env.PORT || 3000));
})

