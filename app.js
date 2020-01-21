var app = require('./config/server')
var GeradorDeRota = require('./app/models/GeradorDeRota')

app.listen(3000,() => {
    console.log("Servidor ON")

    const origem = {
        latitude: -3.091347,
        longitude: -60.017486
    }

    const ecopontos = [
        {
            latitude: -3.091347,
            longitude: -60.017486,
            nivel: 80,
            volume: 100,
            diasSemColeta: 1
        },
        {
            latitude: -3.007,
            longitude: -60.031,
            nivel: 80,
            volume: 100,
            diasSemColeta: 1
        },
        {
            latitude: -3.007,
            longitude: -60.022,
            nivel: 80,
            volume: 100,
            diasSemColeta: 1
        }
    ]

    const caminhoes = [
        {
            capacidade: 500
        },
        {
            capacidade: 500
        },
        {
            capacidade: 500
        },
        {
            capacidade: 500
        }
    ]

    let gerador = new GeradorDeRota()
    gerador.geraRotas(origem, ecopontos, caminhoes).then((rotas) => {
        console.log(rotas)
    })
    // gerador.dividePorRegiao(ecopontos, 0, []).then((ecopontosPorRegiao) => {
    //     console.log(ecopontosPorRegiao)
    // }).catch((erro) => {
    //     console.log(erro)
    // })
})