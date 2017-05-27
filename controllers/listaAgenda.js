var mongoose = require('mongoose');
var Agenda  = mongoose.model('agenda');

exports.findAllAgenda = function(req, res) {
	Agenda.find(function(err, listaAgenda) {
    if(err) res.send(500, err.message);

    console.log('GET api/Agenda')
		res.status(200).jsonp(listaAgenda);
	});
};

exports.findById = function(req, res) {
	Agenda.findById(req.params.id, function(err, agenda) {
    if(err) return res.send(500, err.message);

    console.log('GET api/Agenda/' + req.params.id);
		res.status(200).jsonp(agenda);
	});
};

exports.addAgenda = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var agendaJson = new Agenda({
		id_lugar: req.body.id_lugar,
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		fecha: req.body.fecha
	});

	agendaJson.save(function(err, agenda) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(agendaJson);
	});
};

exports.deleteAgenda = function(req, res) {
    Comentarios.findById({_id:req.params.id}).exec(function(err, agenda){
        if(agenda) {
           agenda.remove();
        }
    });
}