var {model, Schema} = require('mongoose')

// Atributos e variáveis que o motorista pode ter 
// type: tipo do atributo
// required: ele é necessário se aparecer ou não

var MotoristaSchema = new Schema({
    nome: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefone:{
        type: Number, 
        required: true
    },
    senha: {
        type: String, 
        required: true
    },
    cpf: {
        type: Number, 
        required: true
    },
    motoristaID: {
        type: Number, 
        required: true
    },
    status: {
        type: Number,
        required: true
    }    
}, {
    timestamps: true
})

module.exports = model('motoristas', MotoristaSchema)