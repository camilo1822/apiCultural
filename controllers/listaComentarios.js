var mongoose = require('mongoose');
var Comentarios  = mongoose.model('comentarios');

exports.findAllComentarios = function(req, res) {
	Comentarios.find(function(err, listaComentarios) {
    if(err) res.send(500, err.message);

    console.log('GET api/Comentarios')
		res.status(200).jsonp(listaComentarios);
	});
};

exports.findById = function(req, res) {
	Comentarios.findById(req.params.id, function(err, comentarios) {
    if(err) return res.send(500, err.message);

    console.log('GET api/Comentarios/' + req.params.id);
		res.status(200).jsonp(comentarios);
	});
};

exports.addComentario = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var comentariosJson = new Favoritos({
		id_lugar: req.body.id_lugar,
		comentario: req.body.comentario
	});

	comentariosJson.save(function(err, comentarios) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(comentariosJson);
	});
};