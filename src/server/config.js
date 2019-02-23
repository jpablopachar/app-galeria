const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');

const path = require('path');

/*               Base de datos                  */
require('../db/database');

const app = express();

// Usa el puerto establecido o usa el puerto 3000
app.set('port', process.env.PORT || 3000);

/*                   Vistas                      */
app.set('views', path.join(__dirname, '../views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
}));
app.set('view engine', '.hbs');

/*                 Middleware                   */
app.use(morgan('dev'));
// Recibe los datos que vienen desde formularios
app.use(express.urlencoded({ extended: false }));
// Convierte los objetos a json
app.use(express.json());
// Coloca una sola imagen en la ruta establecida
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

app.use(multer({ storage }).single('imagen'));

/*                    Rutas                     */
// app.use(require('../routes/imagen'));

module.exports = app;