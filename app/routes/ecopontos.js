var EcopontoControllers = require('../controllers/EcopontosController.js')

module.exports = function (application) {
    application.get('/lista_ecopontos', EcopontoControllers.lista_ecopontos) 
    application.post('/cadastrar_ecopontos', EcopontoControllers.cadastrar_ecopontos)
}