
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
var LugaresCtrl = require('./controllers/listaLugares');


app.use(router);

// API routes
var listaLugares = express.Router();

listaLugares.route('/listaLugares')
  .get(LugaresCtrl.findAllLugares)
  .post(LugaresCtrl.addLugar);

var uri = 'mongodb://lugares:apicultural@ds011379.mlab.com:11379/lugares';
db = mongoose.createConnection(uri);
Schema = mongoose.Schema;

  var LugaresSchema = new Schema({
    title:    { type: String },
    image:     { type: String },
    description: {type: String},
    latitud: {type: Number},
    longitud: {type: Number},
    qr: {type: String},
    direccion: {type: String},
    tipo:    {
      type: String,
      enum: ['estatua', 'parque', 'mural', 'edificacion']
    }
  });
  var LugaresModel = mongoose.model('Lugares', LugaresSchema);
  //var test = new LugaresModel({name: "test", password: "test"})







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


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Servidor Proyecto Integrador I!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})