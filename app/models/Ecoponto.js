var {model, Schema} = require('mongoose')

var EcopontoSchema = new Schema({
    nome: {
        type: String, 
        required: true
    },
    ecopontoID: {
        type: Number,
        required: true
    },
    temperatura:{
        type: Number, 
        required: true
    },
    latitude: {
        type: Number, 
        required: true
    },
    longitude: {
        type: Number, 
        required: true
    },
    endereco: {
        type: String, 
        required: false
    },
    nivelCheio: {
        type: Number, 
        required: true
    },
    nivelGas: {
        type: Number, 
        required: true
    },
    ultimaColeta: {
        type: Date,
        required: true
    },
    capacidade: {
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

module.exports = model('ecopontos', EcopontoSchema)