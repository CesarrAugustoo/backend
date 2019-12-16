var Ecoponto = require('../models/Ecoponto.js')

module.exports = {
    async lista_ecopontos(req, res){
        Ecoponto.find().then((ecoponto) => {
            console.log("Encontroou")
            res.send(ecoponto)
        }).catch((erro) => {
            console.log("Nao Encontroou")
            res.send(erro)
        })
        // try{
        //     var ecopontos = await Ecopontos.find()
        //     console.log("Entrou lista")
        //     res.send(ecopontos)
        // }
        // catch{
        //     console.log('Erro no BD!')
        // }
        
    },
    async cadastrar_ecopontos(req, res){
        var ecoponto = new Ecoponto()
        console.log(req.body.ecoponto)
        ecoponto = req.body.ecoponto;
        // ecoponto.nome = "Ecoponto - Teste"
        // ecoponto.ecopontoID = 3
        // ecoponto.temperatura = 40
        // ecoponto.latitude = -3.091466
        // ecoponto.longitude = -60.0172555
        // ecoponto.nivelCheio = 80
        // ecoponto.nivelGas = 35
        // var {nome, ecopontoID, temperatura, latitude, longitude, nivelCheio, nivelGas} =  //req.body

        await Ecoponto.create(ecoponto).then((ecoponto) =>{

        }).catch(() =>{

        })

        res.send(`<html>
        <body>
            <h1>Nome: `+ ecoponto.nome +`</h1>
            <h1>EcopontoID: ` + ecoponto.ecopontoID + `</h1>
            <h1>Temperatura: ` + ecoponto.temperatura + ` </h1>
            <h1>Latitude: ` + ecoponto.latitude + `</h1>
            <h1>Longitude: ` + ecoponto.longitude + `</h1>
            <h1>Nivel do Ecoponto: ` + ecoponto.nivelCheio + `</h1>
            <h1>Nivel do gas: ` + ecoponto.nivelGas + `</h1>
        </body></html>`)
        return res.json(req.body)
    },
    async teste(req, res) {
        return res.send("<html><body>Testezinho 22</body></html>")
    }
}