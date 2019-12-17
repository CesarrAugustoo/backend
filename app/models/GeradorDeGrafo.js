class GeradorDeGrafo {

    // Lista de Vértices do Grafo
    vertices = []
    // Grafo gerado a partir dos vértices
    grafo

    /**
     * Este método inicializa uma instância de um grafo
    */
    inicializaGrafo() {
        // Requisita o grafo
        var Grafo = require('./Grafo')

        //Instancia um objeto de Grafo
        this.grafo = new Grafo()
    }

    /**
     * Este método gera um grafo a partir de uma lista de ecopontos
     * @param listaEcopontos Lista de ecopontos a serem adicionados ao grafo
    */
    geraAPartirDe(listaEcopontos = []) {
        return new Promise((resolve, reject) => {

            this.inicializaGrafo()

            // Percorre a lista de ecopontos para incluir os vertices no grafo
            listaEcopontos.foreach((ecoponto, indice) => {
                vertices.push(grafo.addVertice(indice, 1))
            })

            // Percorre a lista de ecopontos e encontra todas as distâncias das 
            // arestas do grafo
            listaEcopontos.foreach((ecoponto, indice) => {
                this.geraArestasAPartirDe(listaEcopontos, indice)
            })

            resolve(true)
        })
    }

    /**
     * Este método gera todas as arestas entre todos os vértices a partir das distâncias
     * entre os pontos
    */
    geraArestasAPartirDe(listaEcopontos, indiceAtual) {
        return new Promise((resolve, reject) => {
            // Percorre lista de ecopontos para criar arestas entre todos os pontos
            // e o ponto com o índice atual
            listaEcopontos.foreach((ecoponto, indice) => {
                if (indice != indiceAtual) {
                    // Ponto de origem da aresta
                    const origem = listaEcopontos[indiceAtual].latitude 
                                    + ',' 
                                    + listaEcopontos[indiceAtual].longitude 
                    
                    // Ponto de destino da aresta
                    const destino = listaEcopontos[indice].latitude 
                                    + ',' 
                                    + listaEcopontos[indice].longitude 

                    // Gera a aresta a partir da distância encontrada entre o ponto
                    // de origem e o ponto de destino
                    this.calculaDistancia(origem, destino).then((distancia) => {
                        this.grafo.addAresta(this.vertices[indiceAtual], 
                            this.vertices[indice], 
                            distancia)
                            resolve(true)
                    })
                } else {
                    // Gera a aresta a partir da distância encontrada entre o ponto
                    // de origem e o ponto de destino            
                    this.grafo.addAresta(this.vertices[indiceAtual], 
                                            this.vertices[indice], 
                                            0.0)
                }
            })

            resolve(true)
        })
    }

    /**
     * Calcula a distância entre dois ecopontos utilizando a API do google de distância
    */
    calculaDistancia(origem, destino) {
        return new Promise((resolve, reject) => {
            // Requisita o google distance
            var distance = require('google-distance');

            // Busca a distância a partir de um ponto de origem e um ponto de destino
            distance.get({
                index: 1,
                origin: origem,
                destination: destino
            },
            function(err, data) {
                if (err) return 0.0
                
                return data.distanceValue
            });
        })
    }

    getGrafo() {
        return this.grafo
    }
}

module.exports = GeradorDeGrafo