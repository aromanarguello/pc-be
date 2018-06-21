const express      = require('express');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const cors         = require('cors');
const router = require('./routes/router');
const morgan = require('morgan');

require('dotenv').config();
require('./config/mongoose-setup');
// require('./config/passport-setup');
const app = express();
// default value for title local
app.locals.title = 'PC-BE';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(
  cors({
    // sends cookies across domains
    credentials: true,
    // ONLY allow these domains
    origin: [ 'http://localhost:4200', 'http://localhost:3000' ]
  })
);

app.use(morgan('combined'))
app.use(bodyParser.json());
router(app);

/**
 * Begin Routes
 */
// const pricesApi = require('./routes/main-router');
// app.use('/api', pricesApi);

/**
 * End Routes
 */
module.exports = app;
