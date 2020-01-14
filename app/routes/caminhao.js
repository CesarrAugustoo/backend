var CaminhaoControllers = require('../controllers/CaminhaoController.js')

module.exports = function (application) {
    application.get('/lista_caminhoes', CaminhaoControllers.lista_caminhoes)
    application.post('/cadastrar_caminhao', CaminhaoControllers.cadastrar_caminhao)
    application.post('/buscar_caminhao', CaminhaoControllers.buscar_caminhao)
}