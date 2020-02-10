var EcopontoControllers = require('../controllers/EcopontosController.js')

// Caminhos que a aplicação usará para pegar ou postar informações
module.exports = function (application) {
    application.get('/lista_ecopontos', EcopontoControllers.lista_ecopontos)
    application.get('/deletar_ecopontos', EcopontoControllers.deletar_ecopontos)
    application.post('/cadastrar_ecoponto', EcopontoControllers.cadastrar_ecopontos)
    application.post('/buscar_ecoponto', EcopontoControllers.buscar_ecoponto)
    application.post('/atualizar_ecoponto', EcopontoControllers.atualizar_ecoponto)
    application.post('/desativar_ecoponto', EcopontoControllers.desativar_ecoponto)
    application.post('/reativar_ecoponto', EcopontoControllers.reativar_ecoponto)
}