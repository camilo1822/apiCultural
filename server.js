var express = require('express');
var app = express();

app.get('/', function (req, res) {
    var remoteAddress = req.headers['x-forwarded-for'] || 
              req.connection.remoteAddress;
    res.json({ "ipAddress": remoteAddress });
});


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
var TVShowCtrl = require('./controllers/listaLugares');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

// API routes
var listaLugares = express.Router();

listaLugares.route('/listaLugares')
  .get(TVShowCtrl.findAllLugares)
  .post(TVShowCtrl.addLugar);



app.use('/api', listaLugares);


app.listen(process.env.PORT || 80);

