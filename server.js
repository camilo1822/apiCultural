
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


// API routes
var listaLugares = express.Router();

listaLugares.route('/listaLugares')
  .get(LugaresCtrl.findAllLugares)
  .post(LugaresCtrl.addLugar);
listaLugares.route('/listaLugares/:id')
  .get(LugaresCtrl.findById)

app.use(listaLugares);

var uri = 'mongodb://lugares:apicultural@ds011379.mlab.com:11379/lugares';
db = mongoose.createConnection(uri);







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