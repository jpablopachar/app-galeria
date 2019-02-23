const app = require('./server/config');

// Escucha en el puerto establecido
app.listen(app.get('port'), () => console.log(`Servidor en puerto ${app.get('port')}`));