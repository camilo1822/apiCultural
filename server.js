
var express = require('express')
var app = express()
var mongoose = require('mongoose')
var bodyParser      = require("body-parser")
var methodOverride  = require("method-override")

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//importo controlador
var models     = require('./models/lugares')(app, mongoose);
var LugaresCtrl = require('./controllers/listaLugares');


/*var uri = 'mongodb://10.239.188.122:42158@ds011379.mlab.com:11379/heroku_2v8qghk7';
db = mongoose.createConnection(uri);*/


// API routes
var listaLugares = express.Router();

listaLugares.route('/listaDeLugares')
  .get(LugaresCtrl.findAllLugares)
  .post(LugaresCtrl.addLugar);
listaLugares.route('/listaDeLugares/:id')
  .get(LugaresCtrl.findById)

app.use('api',listaLugares);


var PUser = mongoose.model('lugares', lugaresSchema);

var nuevoLugar = new PUser ({
  "title": "LOST",
  "image": "2004",
  "description": "USA",
  "latitud": 10.5,
  "longitud": 6,
  "qr": "Sci-Fi",
  "direccion": "la calle",
  "tipo": "estatua"
});

nuevoLugar.save(function (err) {if (err) console.log ('Error on save!')});



var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/listaLugares';

mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

// The http server will listen to an appropriate port, or default to
// port 5000.
var port = process.env.PORT || 5000;

//app.use('/api/v1', router);
app.get('/', function(request, response) {
  response.send('Servidor Proyecto Integrador I!')
})

app.listen(port, function() {
  console.log('Node Server Running in the port:'+port);
});



  /*console.log("me: " + test)

  test.save(function (err, test) {
    console.log("saved?")
    if (err) {
      console.log("error");
      return console.error(err);
    }
    console.log("saved!")
  });
  console.log("after save");*/


/*app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Servidor Proyecto Integrador I!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})*/