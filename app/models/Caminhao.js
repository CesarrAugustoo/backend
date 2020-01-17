var {model, Schema} = require('mongoose')

var CaminhaoSchema = new Schema({
    placa: {
        type: String, 
        required: true
    },
    numeroSerie: {
        type: Number,
        required: true
    },
    modelo:{
        type: String, 
        required: true
    },
    ano: {
        type: Number, 
        required: true
    },
    capacidade: {
        type: Number, 
        required: true
    },
    caminhaoID: {
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

module.exports = model('caminhoe', CaminhaoSchema)