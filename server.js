var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/listaLugares', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

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

// Start server
app.set('port', (process.env.PORT || 5000))
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
