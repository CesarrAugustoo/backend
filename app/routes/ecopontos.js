var EcopontoControllers = require('../controllers/EcopontosController.js')

module.exports = function (application) {
    application.get('/lista_ecopontos', EcopontoControllers.lista_ecopontos) 
    application.post('/cadastrar_ecopontos', EcopontoControllers.cadastrar_ecopontos)
    application.post('/buscar_ecoponto', EcopontoControllers.buscar_ecoponto)
    application.post('/atualizar_ecoponto', EcopontoControllers.atualizar_ecoponto)
    application.post('/desativar_ecoponto', EcopontoControllers.desativar_ecoponto)
    application.post('/reativar_ecoponto', EcopontoControllers.reativar_ecoponto)
}