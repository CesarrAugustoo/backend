module.exports = function (application) {
    application.get('/motorista', function(req, res) {
        res.send("<html><body>Teste</body></html>")
    })
}