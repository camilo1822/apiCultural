var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
//https://git.heroku.com/pure-ravine-19825.git

//mongoose.connect('mongodb://localhost/listaLugares', function(err, res) {
/*mongoose.connect('https://git.heroku.com/pure-ravine-19825.git/listaLugares', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});*/

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/lugares')(app, mongoose);
var LugaresCtrl = require('./controllers/listaLugares');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

// API routes
var listaLugares = express.Router();

listaLugares.route('/listaLugares')
  .get(LugaresCtrl.findAllLugares)
  .post(LugaresCtrl.addLugar);

listaLugares.route('/listaLugares/:id')
  .get(LugaresCtrl.findById)
  //.put(LugaresCtrl.updateTVShow)
  //.delete(LugaresCtrl.deleteTVShow);

app.use(listaLugares);


/*var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_UR;
var db;
*/

//mongodb://lugares:apicultural@ds011379.mlab.com:11379/heroku_2v8qghk7
//mongoose.connect('mongodb://localhost/listaLugares', function(err, res) {




mongoose.connect('mongodb://lugares:apicultural@ds011379.mlab.com:11379/lugares', function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
 
  app.listen(5000, function() {
    console.log("Node server running on http://localhost:8080");
  });
});





// Start server
/*app.set('port', (process.env.PORT || 3000))
app.get('/', function(req, res){
  res.json({ mensaje: 'Un ejemplo de nodejs, express y Heroku'});
});

app.listen(app.get('port'));
/*app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});*/

//var server = app.listen(process.env.PORT || 8080, function () {
/*var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});*/