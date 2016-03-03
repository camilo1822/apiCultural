exports = module.exports = function(app, mongoose) {

  var lugaresSchema = new mongoose.Schema({
    title:    { type: String },
    image:     { type: String },
	description: {type: String},
	latitud: {type: double},
	longitud: {type: double},
	qr: {type: String},
	direccion: {type: String},
    tipo:    {
      type: String,
      enum: ['estatua', 'parque', 'mural', 'edificacion']
    },
   
  });

  mongoose.model('Lugares', lugaresSchema);

};
