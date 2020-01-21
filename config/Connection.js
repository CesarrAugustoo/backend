var Mongoose = require('mongoose')
var cors = require('cors')

Mongoose.connect('mongodb+srv://usuario1:asd123456@coleta-4xqe0.mongodb.net/sistic?retryWrites=true&w=majority');
Mongoose.connection.on('connected', () => console.log('Connected'));
Mongoose.connection.on('error', (err) => console.log('Connection failed with - ',err));