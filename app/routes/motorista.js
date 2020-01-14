var MotoristaControllers = require('../controllers/MotoristaController.js')

module.exports = function (application) {
    application.get('/lista_motoristas', MotoristaControllers.lista_motoristas)
    application.post('/cadastrar_motoristas', MotoristaControllers.cadastrar_motorista)
    application.post('/buscar_motorista', MotoristaControllers.buscar_motorista)
}