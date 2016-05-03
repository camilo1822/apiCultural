exports = module.exports = function(app, mongoose) {

  var comentariosSchema = new mongoose.Schema({
    id_lugar:    { type: String },
    foto: {type:String},
    nombre: {type:String},
    comentario:    { type: String }
 });

  mongoose.model('comentarios', comentariosSchema);

};