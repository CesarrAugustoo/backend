var {model, Schema} = require('mongoose')

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
        type: String,
        required: true
    }    
}, {
    timestamps: true
})

module.exports = model('motorista', MotoristaSchema)