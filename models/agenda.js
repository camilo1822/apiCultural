exports = module.exports = function(app, mongoose) {

  var agendaSchema = new mongoose.Schema({
    id_lugar:    { type: String },
    nombre: {type:String},
    descripcion: {type:String},
    fecha:    { type: String }
 });

  mongoose.model('agenda', agendaSchema);

};