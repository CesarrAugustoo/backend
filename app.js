var app = require('./config/server')
var Grafo = require('./app/models/Grafo');
var Dijkstra = require('./app/models/Dijkstra')
var GeradorDeRegiao = require('./app/models/GeradorDeRegiao')
var GeradorDeGrafo = require('./app/models/GeradorDeGrafo')
var AnalisadorDeEcoponto = require('./app/models/AnalisadorDeEcoponto')

app.listen(3000,() => {
    console.log("Servidor ON")

    let grafo = new Grafo()

    let v1 = grafo.addVertice(1, 1)
    let v2 = grafo.addVertice(2, 1)
    let v3 = grafo.addVertice(3, 1)
    let v4 = grafo.addVertice(4, 1)

    let a1 = grafo.addAresta(v2, v4, 3)
    let a2 = grafo.addAresta(v1, v4, 4)
    let a3 = grafo.addAresta(v2, v3, 5)
    let a4 = grafo.addAresta(v1, v3, 3)

    let ma = grafo.getMatrizDeAdjacencia()

    let dijkstra = new Dijkstra()
    dijkstra.executar(ma, 0)

    const ecopontos = [
        {
            latitude: -3.091347,
            longitude: -60.017486,
            nivel: 80,
            diasSemColeta: 1
        },
        {
            latitude: -3.007,
            longitude: -59.001,
            nivel: 80,
            diasSemColeta: 1
        },
        {
            latitude: -3.007,
            longitude: -59.002,
            nivel: 80,
            diasSemColeta: 1
        }
    ]

    let gRegiao = new GeradorDeRegiao()
    gRegiao.geraRegiaoPorGeografia()

    let gGrafo = new GeradorDeGrafo()


    let analisador = new AnalisadorDeEcoponto()
    let ecopontosProntos = analisador.devolveEcopontosProntosPraColeta(ecopontos)

    gGrafo.geraAPartirDe(ecopontosProntos).then(() => {
        let dijkstra = new Dijkstra()
        
        let grafo = gGrafo.getGrafo()

        dijkstra.executar(grafo.getMatrizDeAdjacencia(), 0)
        console.log('Vertice 1')
        console.log(dijkstra.getArrayVertices())

        dijkstra.executar(grafo.getMatrizDeAdjacencia(), 1)
        console.log('Vertice 2')
        console.log(dijkstra.getArrayVertices())

        dijkstra.executar(grafo.getMatrizDeAdjacencia(), 2)
        console.log('Vertice 3')
        console.log(dijkstra.getArrayVertices())

    }).catch(() => {
        console.log('Erro grafo')
    })

})