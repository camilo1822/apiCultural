exports = module.exports = function(app, mongoose) {

  var favoritosSchema = new mongoose.Schema({
    id_user:    { type: String },
    title:    { type: String },
    sites:    [
       {type: String}
    
    ]
   
  });

  mongoose.model('favoritos', favoritosSchema);

};
