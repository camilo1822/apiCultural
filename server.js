
var express = require('express')
var app = express()
var mongoose = require('mongoose')

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

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
  var test = new LugaresModel({name: "test", password: "test"})

  console.log("me: " + test)

  test.save(function (err, test) {
    console.log("saved?")
    if (err) {
      console.log("error");
      return console.error(err);
    }
    console.log("saved!")
  });
  console.log("after save");