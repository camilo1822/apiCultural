exports = module.exports = function(app, mongoose) {

  var favoritosSchema = new mongoose.Schema({
    id_user:    { type: String },
    id_lugar:    { type: String },
    title:    { type: String },
    image:    { type: String },
  });

  mongoose.model('favoritos', favoritosSchema);

};
