var Mongoose = require('mongoose')
var cors = require('cors')

// Sets que removem deprecations/warnings
Mongoose.set('useNewUrlParser', true);
Mongoose.set('useFindAndModify', false);
Mongoose.set('useCreateIndex', true);
Mongoose.set('useUnifiedTopology', true);

// Conexões mongo/mongoose para conectar com o banco de dados mongodb
Mongoose.connect('mongodb+srv://usuario1:asd123456@coleta-4xqe0.mongodb.net/sistic?retryWrites=true&w=majority');
Mongoose.connection.on('connected', () => console.log('Connected'));
Mongoose.connection.on('error', (err) => console.log('Connection failed with - ',err));