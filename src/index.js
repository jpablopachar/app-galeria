if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = require('./server/config');

// Escucha en el puerto establecido
app.listen(app.get('port'), () => {
  console.log('Entorno: ', process.env.NODE_ENV);
  console.log(`Servidor en puerto ${app.get('port')}`);
});