//File: controllers/tvshows.js
var mongoose = require('mongoose');
var Lugares  = mongoose.model('Lugares');

//GET - Return all tvshows in the DB
exports.findAllLugares = function(req, res) {
	Lugares.find(function(err, listaLugares) {
    if(err) res.send(500, err.message);

    console.log('GET /listaDeLugares')
		res.status(200).jsonp(listaLugares);
	});
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {
	Lugares.findById(req.params.id, function(err, lugares) {
    if(err) return res.send(500, err.message);

    console.log('GET /lugares/' + req.params.id);
		res.status(200).jsonp(lugares);
	});
};

//POST - Insert a new TVShow in the DB
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

	lugares.save(function(err, lugares) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(lugaresJson);
	});
};