//File: controllers/tvshows.js
var mongoose = require('mongoose');
var Favoritos  = mongoose.model('favoritos');

//GET - Return all lugares in the DB
exports.findAllFavoritos = function(req, res) {
	Favoritos.find(function(err, listaFavoritos) {
    if(err) res.send(500, err.message);

    console.log('GET api/Favoritos')
		res.status(200).jsonp(listaFavoritos);
	});
};

//GET - Return a lugar with specified ID
exports.findById = function(req, res) {
	Favoritos.findById(req.params.id, function(err, favoritos) {
    if(err) return res.send(500, err.message);

    console.log('GET api/Favoritos/' + req.params.id);
		res.status(200).jsonp(favoritos);
	});
};

//POST - Insert a new lugar in the DB
exports.addFavorito = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var favoritosJson = new Favoritos({
		id_user:    req.body.id_user,
		title: req.body.title,
		sites: req.body.sites
	});

	favoritosJson.save(function(err, lugares) {
		if(err) return res.send(500, err.message);
		//quitar ahora
	//console.log('GET api/Favoritos');
    res.status(200).jsonp(favoritosJson);
	});
};