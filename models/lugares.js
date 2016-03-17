exports = module.exports = function(app, mongoose) {

  var lugaresSchema = new mongoose.Schema({
    title:    { type: String },
    image:     { type: String },
	  description: {type: String},
	  latitud: {type: Number},
	  longitud: {type: Number},
	  qr: {type: String},
	  direccion: {type: String},
    tipo:    {
      type: String,
      enum: ['estatua', 'parque', 'mural', 'edificacion']
    }
   
  });

  mongoose.model('lugares', lugaresSchema);

};
