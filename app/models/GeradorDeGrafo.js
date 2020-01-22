class GeradorDeGrafo {

    constructor() {
        // Lista de Vértices do Grafo
        this.vertices = []
        // Grafo gerado a partir dos vértices
        this.grafo
    }
    
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
    geraAPartirDe(listaEcopontos) {
        // Retorna uma Promise
        return new Promise((resolve, reject) => {
            this.inicializaGrafo()
            // Percorre a lista de ecopontos para incluir os vertices no grafo
            
            for (var i = 0; i < listaEcopontos.length; i++) {
                this.vertices.push(this.grafo.addVertice(i, 1))
            }

            // Cria todas as arestas entre todos os ecopontos
            this.getArestas(listaEcopontos, 0, 0).then(() => {
                resolve()
            }).catch((erro) => {
                reject(erro)
            })
        })
    }

    /**
     * Este método adiciona recursivamente todas as arestas do grafo de ecopontos
     * @param listaEcopontos Lista de Ecopontos
     * @param indiceVertice Indice do Vértice de Origem
     * @param indiceAtual Indice do Vértice de Destino
    */
    getArestas(listaEcopontos, indiceVertice, indiceAtual) {
        // Retorna uma Promise
        return new Promise((resolve, reject) => {
            // Requisita a API do Google de distância
            var distance = require('google-distance');
            // Seta a chave da API do Google Maps
            distance.apiKey = 'AIzaSyARyLoGeD0pusU8Yq_FpUVk71Y1VSGmm-s';

            // Calcula a distância entre dois pontos usando a API
            this.getDistancia(listaEcopontos[indiceVertice], listaEcopontos[indiceAtual]). then((distancia) => {
                // Adiciona aresta ao grafo de acordo com a distância calculada
                this.grafo.addAresta(this.vertices[indiceVertice], 
                    this.vertices[indiceAtual], 
                    distancia)

                // Verifica se a iteração atual é a última
                if (indiceVertice == listaEcopontos.length - 1 && indiceAtual == listaEcopontos.length - 1) {
                    resolve()
                } else {
                    // Verifica se o ecoponto de destino é o último do vetor
                    if (indiceAtual == listaEcopontos.length - 1) {
                        this.getArestas(listaEcopontos, indiceVertice + 1, 0).then(() => {
                            resolve()
                        })
                    } else {
                        this.getArestas(listaEcopontos, indiceVertice, indiceAtual + 1).then(() => {
                            resolve()
                        })
                    }
                }
            }).catch((erro) => {
                reject(erro)
            })
        })
    }

    /**
     * Este método calcula a distância em quilometros de um ecoponto de origem
     * até um ecoponto de destino
     * @param ecopontoOrigem Ecoponto de Origem
     * @param ecopontoDestino Ecoponto de Destino
    */
    getDistancia(ecopontoOrigem, ecopontoDestino) {
        return new Promise((resolve, reject) => {
            var distance = require('google-distance');
            distance.apiKey = 'AIzaSyARyLoGeD0pusU8Yq_FpUVk71Y1VSGmm-s';

            // Vertice de origem (latitude, longitude)
            const origem = ecopontoOrigem.latitude 
                + ',' 
                + ecopontoOrigem.longitude 

            // Vertice de destino (latitude, longitude)
            const destino = ecopontoDestino.latitude 
                + ',' 
                + ecopontoDestino.longitude 
            
            // API calcula a distância
            distance.get({
                index: 1,
                origin: origem,
                destination: destino
            }, 
            (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data.distanceValue)
                }
            })
        })
    }

    /**
     * Devolve o grafo gerado
    */
    getGrafo() {
        return this.grafo
    }
}

module.exports = GeradorDeGrafo