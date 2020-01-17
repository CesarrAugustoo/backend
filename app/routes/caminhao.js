var CaminhaoControllers = require('../controllers/CaminhaoController.js')

module.exports = function (application) {
    application.get('/lista_caminhoes', CaminhaoControllers.lista_caminhoes)
    application.post('/cadastrar_caminhao', CaminhaoControllers.cadastrar_caminhao)
    application.post('/buscar_caminhao', CaminhaoControllers.buscar_caminhao)
    application.post('/atualizar_caminhao', CaminhaoControllers.atualizar_caminhao)
    application.post('/desativar_caminhao', CaminhaoControllers.desativar_caminhao)
    application.post('/reativar_caminhao', CaminhaoControllers.reativar_caminhao)
}