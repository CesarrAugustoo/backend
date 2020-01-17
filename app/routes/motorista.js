var MotoristaControllers = require('../controllers/MotoristaController.js')

module.exports = function (application) {
    application.get('/lista_motoristas', MotoristaControllers.lista_motoristas)
    application.post('/cadastrar_motorista', MotoristaControllers.cadastrar_motorista)
    application.post('/buscar_motorista', MotoristaControllers.buscar_motorista)
    application.post('/atualizar_motorista', MotoristaControllers.atualizar_motorista)
    application.post('/desativar_motorista', MotoristaControllers.desativar_motorista)
    application.post('/reativar_motorista', MotoristaControllers.reativar_motorista)
}