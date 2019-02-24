const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImagenSchema = new Schema({
  titulo: String,
  descripcion: String,
  imagenPath: String,
  publicId: String
});

module.exports = mongoose.model('Imagen', ImagenSchema);