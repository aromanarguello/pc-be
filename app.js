const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const cors         = require('cors');
const session      = require('express-session');
const passport     = require('passport');
const LocalStrategy = require('passport-local').Strategy;


require('dotenv').config();
require('./config/mongoose-setup');
require('./config/passport-setup');
const router = express.Router()

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(
  session({
    resave:            true,
    saveUninitialized: true,
    secret:            'asdadasd adad'
  })
);

app.use(passport.initialize());
app.use(passport.session());

/**
 * Begin Routes
 */
const pricesApi = require('./routes/main-router');
app.use('/api', pricesApi);
const userApi   = require('./routes/user-router');
app.use('/api', userApi);

const auth = require('./routes/auth');
// app.use('/auth', auth)

/**
 * End Routes
 */
module.exports = app;
