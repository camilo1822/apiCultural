exports = module.exports = function(app, mongoose) {

  var comentariosSchema = new mongoose.Schema({
    id_lugar:    { type: String },
    comentario:    { type: String }
 });

  mongoose.model('comentarios', comentariosSchema);

};