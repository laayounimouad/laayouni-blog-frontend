
var express = require('express');

var app = express();
var config = require('./config');
const { engine } = require('express-edge');
const edge = require("edge.js");
var routes = require('./routes');
const expressSession = require('express-session');
const auth = require('./middleware/auth');
//use the public directory
app.use(express.static('public'));

// setting up sessions
app.use(expressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 } //60min
}));
//use engine
app.use(engine);
app.set('views', __dirname + '/views');

// use bodyParser for requests params
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('*', (req, res, next) => {
   edge.global('auth', req.session.userId)
  next()
},auth.roleAuth);

app.use('/', routes.index);
app.use('/articles',auth.createAuth ,routes.articles);
app.use('/users',routes.users);
app.use('/userListe',routes.userListe);


// start server
app.listen(config.server.port, function() {
  console.log(`Server started on ${config.server.host}:${config.server.port}`);
});