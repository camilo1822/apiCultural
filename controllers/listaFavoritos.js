var mongoose = require('mongoose');
var Favoritos  = mongoose.model('favoritos');
var mongodb = require('mongodb');

exports.findAllFavoritos = function(req, res) {
	Favoritos.find(function(err, listaFavoritos) {
    if(err) res.send(500, err.message);

    console.log('GET api/Favoritos')
		res.status(200).jsonp(listaFavoritos);
	});
};

exports.findById = function(req, res) {
	Favoritos.findById(req.params._id, function(err, favoritos) {
    if(err) return res.send(500, err.message);

    console.log('find api/Favoritos/' + req.params.id);
		res.status(200).jsonp(favoritos);
	});
};

exports.deleteFavorito = function(req, res) {  
    Favoritos.findById({_id: new mongodb.ObjectID(req.params.id)}, function(err, favoritos) {
    	console.log("estes es el id",req.params.id);
        Favoritos.remove(/*{_id: new mongodb.ObjectID(req.params.id)},*/function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
   });
};

exports.addFavorito = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var favoritosJson = new Favoritos({
		id_user:    req.body.id_user,
		id_lugar: req.body.id_lugar,
		title: req.body.title,
		image: req.body.image
	});

	favoritosJson.save(function(err, lugares) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(favoritosJson);
	});
};