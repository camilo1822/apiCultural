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

	var comentariosJson = new Comentarios({
		id_lugar: req.body.id_lugar,
		foto: req.body.foto,
		nombre: req.body.nombre,
		comentario: req.body.comentario
	});

	comentariosJson.save(function(err, comentarios) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(comentariosJson);
	});
};

/*exports.deleteComentario = function(req, res) {  
    Comentarios.findById(req.params.id, function(err, comentarios) {
        Comentarios.remove(/*{_id: new mongodb.ObjectID(req.params.id)},*//*function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
   });
};*/


exports.deleteComentario = function(req, res) {
    Comentarios.findById({_id:req.params.id}).exec(function(err, comentarios){
        if(comentarios) {
           comentarios.remove();
        }
    });
}