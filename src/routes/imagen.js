const router = require('express').Router();
const cloudinary = require('cloudinary');
const fs = require('fs-extra');

const Imagen = require('../models/imagen');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get('/', async (req, res) => {
  const imagenes = await Imagen.find();

  res.render('imagen', { imagenes });
});

router.get('/imagenes/agregar', async (req, res) => {
  const imagenes = await Imagen.find();

  res.render('formImagen', { imagenes });
});

router.post('/imagenes/agregar', async (req, res) => {
  const { titulo, descripcion } = req.body;
  // Guardando datos en cloudinary
  try {
    const resultado = await cloudinary.v2.uploader.upload(req.file.path);
    const nuevaImagen = new Imagen({
      titulo,
      descripcion,
      imagenPath: resultado.url,
      publicId: resultado.public_id
    });

    await nuevaImagen.save();
    await fs.unlink(req.file.path);
  } catch (e) {
    console.log(e);
  }

  res.redirect('/');
});

router.get('/imagenes/eliminar/:idImagen', async (req, res) => {
  const { idImagen } = req.params;
  const imagen = await Imagen.findByIdAndRemove(idImagen);
  const resultado = await cloudinary.v2.uploader.destroy(imagen.publicId);

  console.log(resultado);
  res.redirect('imagenes/agregar');
});

module.exports = router;