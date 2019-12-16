var {model, Schema} = require('mongoose')

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
    nivelCheio: {
        type: Number, 
        required: true
    },
    nivelGas: {
        type: Number, 
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('ecopontos', EcopontoSchema)