//File: controllers/tvshows.js
var mongoose = require('mongoose');
var Lugares  = mongoose.model('lugares');

//GET - Return all lugares in the DB
exports.findAllLugares = function(req, res) {
	Lugares.find(function(err, listaLugares) {
    if(err) res.send(500, err.message);
    if(Lugares === null){
      console.log('Customer not found');
      res.send('no hay datos');
      res.status(404).jsonp({error: 'Customer not found'});
    }


    if(Lugares != null){
      console.log('Customer not found');
      res.send('si hay datos');
      res.status(404).jsonp({error: 'Customer not found'});
    }

    res.send('estoy entrando');
    console.log('GET api/listaDeLugares')
		res.status(200).jsonp(lugares);
	});
};

//GET - Return a lugar with specified ID
exports.findById = function(req, res) {
	Lugares.findById(req.params.id, function(err, lugares) {
    if(err) return res.send(500, err.message);

    console.log('GET api/lugares/' + req.params.id);
		res.status(200).jsonp(lugares);
	});
};

//POST - Insert a new lugar in the DB
exports.addLugar = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var lugaresJson = new Lugares({
		title:    req.body.title,
		image: 	  req.body.image,
		description:  req.body.description,
		latitud:   req.body.latitud,
		longitud:  req.body.longitud,
		qr:    req.body.qr,
		direccion:  req.body.direccion,
		tipo: req.body.tipo
	});

	lugaresJson.save(function(err, lugares) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(lugares);
	});
};