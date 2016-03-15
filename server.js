var http = require ('http');       // For serving a basic web page.
var mongoose = require ("mongoose"); // The reason for this demo.

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/HelloMongoose';

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

// This is the schema.  Note the types, validation and trim
// statements.  They enforce useful constraints on the data.
var userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: { type: String, trim: true }
  },
  age: { type: Number, min: 0}
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'PowerUsers' collection in the MongoDB database
var PUser = mongoose.model('PowerUsers', userSchema);

// Clear out old data
PUser.remove({}, function(err) {
  if (err) {
    console.log ('error deleting old data.');
  }
});

// Creating one user.
var johndoe = new PUser ({
  name: { first: 'John', last: 'Doe' },
  age: 25
});

// Saving it to the database.  
johndoe.save(function (err) {if (err) console.log ('Error on save!')});

// Creating more users manually
var janedoe = new PUser ({
  name: { first: 'Jane', last: 'Doe' },
  age: 65
});
janedoe.save(function (err) {if (err) console.log ('Error on save!')});

// Creating more users manually
var alicesmith = new PUser ({
  name: { first: 'Alice', last: 'Smith' },
  age: 45
});
alicesmith.save(function (err) {if (err) console.log ('Error on save!')});


// In case the browser connects before the database is connected, the
// user will see this message.
var found = ['DB Connection not yet established.  Try again later.  Check the console output for error messages if this persists.'];

// Create a rudimentary http server.  (Note, a real web application
// would use a complete web framework and router like express.js). 
// This is effectively the main interaction loop for the application. 
// As new http requests arrive, the callback function gets invoked.
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  createWebpage(req, res);
}).listen(theport);

function createWebpage (req, res) {
  // Let's find all the documents
  PUser.find({}).exec(function(err, result) { 
    if (!err) { 
      res.write(html1 + JSON.stringify(result, undefined, 2) +  html2 + result.length + html3);
      // Let's see if there are any senior citizens (older than 64) with the last name Doe using the query constructor
      var query = PUser.find({'name.last': 'Doe'}); // (ok in this example, it's all entries)
      query.where('age').gt(64);
      query.exec(function(err, result) {
  if (!err) {
    res.end(html4 + JSON.stringify(result, undefined, 2) + html5 + result.length + html6);
  } else {
    res.end('Error in second query. ' + err)
  }
      });
    } else {
      res.end('Error in first query. ' + err)
    };
  });
}

// Tell the console we're getting ready.
// The listener in http.createServer should still be active after these messages are emitted.
console.log('http server will be listening on port %d', theport);
console.log('CTRL+C to exit');

//
// House keeping.

//
// The rudimentary HTML content in three pieces.
var html1 = '<title> hello-mongoose: MongoLab MongoDB Mongoose Node.js Demo on Heroku </title> \
<head> \
<style> body {color: #394a5f; font-family: sans-serif} </style> \
</head> \
<body> \
<h1> hello-mongoose: MongoLab MongoDB Mongoose Node.js Demo on Heroku </h1> \
See the <a href="https://devcenter.heroku.com/articles/nodejs-mongoose">supporting article on the Dev Center</a> to learn more about data modeling with Mongoose. \
<br\> \
<br\> \
<br\> <h2> All Documents in MonogoDB database </h2> <pre><code> ';
var html2 = '</code></pre> <br\> <i>';
var html3 = ' documents. </i> <br\> <br\>';
var html4 = '<h2> Queried (name.last = "Doe", age >64) Documents in MonogoDB database </h2> <pre><code> ';
var html5 = '</code></pre> <br\> <i>';
var html6 = ' documents. </i> <br\> <br\> \
<br\> <br\> <center><i> Demo code available at <a href="http://github.com/mongolab/hello-mongoose">github.com</a> </i></center>';










/*var express = require('express')
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


var uri = 'mongodb://10.239.188.122:42158@ds011379.mlab.com:11379/heroku_2v8qghk7';
db = mongoose.createConnection(uri);


// API routes
var listaLugares = express.Router();

listaLugares.route('/listaLugares')
  .get(LugaresCtrl.findAllLugares)
  .post(LugaresCtrl.addLugar);
listaLugares.route('/listaLugares/:id')
  .get(LugaresCtrl.findById)

app.use(listaLugares);





  /*console.log("me: " + test)

  test.save(function (err, test) {
    console.log("saved?")
    if (err) {
      console.log("error");
      return console.error(err);
    }
    console.log("saved!")
  });
  console.log("after save");


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Servidor Proyecto Integrador I!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})*/