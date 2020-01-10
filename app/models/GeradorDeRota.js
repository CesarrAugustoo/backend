class GeradorDeRota {

    /**
     * Este método é responsável por fazer todos os passos para a criação de rotas:
     * Analisa os ecopontos, verificando quais são aptos a serem coletados;
     * Cria grafos por região de geográfica de ecopontos;
     * Executa o algoritmo de menor caminho várias vezes para encontras as rotas;
     * Devolve as rotas calculadas
     * @param origem Latitude e longitude da estação inicial
     * @param ecopontos Lista de ecopontos cadastrados no sistema
     * @param caminhoes Lista de caminhões cadastrados no sistema
    */
    geraRotas(origem, ecopontos, caminhoes) {
        // Requisita analisador de ecopontos
        var AnalisadorDeEcoponto = require('./AnalisadorDeEcoponto')

        // Verifica ecopontos coletáveis
        let analisador = new AnalisadorDeEcoponto()
        let ecopontosColetaveis = analisador.devolveEcopontosProntosPraColeta(ecopontos)

        // Divide ecopontos coletáveis por região
        let regioes = this.dividePorRegiao(ecopontosColetaveis, 0, [])
        
        // Cria os grafos por regiao
        var grafos = []

        for (var i = 0; i < regioes.length; i++) {
            grafos.push(criaGrafoDeRegiao(regioes[i]))
        }
    }

    /**
     * Cria um grafo totalmente conectado com os ecopontos de uma região
    */
    criaGrafoDeRegiao(regiao) {
        return new Promise((resolve, reject) => {
            var GeradorDeGrafo = require('./GeradorDeGrafo')

            let gGrafo = new GeradorDeGrafo()

            gGrafo.geraAPartirDe(regiao).then(() => {
                let grafo = gGrafo.getGrafo()

            }).catch(() => {
                console.log('Erro grafo')
            })
        })
    }

    /**
     * Divide os ecopontos por região geográfica
    */
    dividePorRegiao(ecopontos, indiceAtual, ecopontosPorRegiao) {
        return new Promise((resolve, reject) => {
            this.buscaRegiaoDoEcoponto(ecopontos[indiceAtual]).then((regiao) => {
                ecopontos[indiceAtual].regiao = regiao

                console.log(regiao)

                var adicionou = false

                for(var i = 0; i < ecopontosPorRegiao.length; i++) {
                    if (!adicionou && ecopontosPorRegiao[i].regiao == ecopontos[indiceAtual].regiao) {
                        ecopontosPorRegiao[i].ecopontos.push(ecopontos[indiceAtual])
                        adicionou = true
                    }
                }

                if (!adicionou) {
                    ecopontosPorRegiao.push(
                    { 
                        regiao: ecopontos[indiceAtual].regiao, 
                        ecopontos: [ecopontos[indiceAtual]] 
                    })
                }

                if (indiceAtual == ecopontos.length - 1) {
                    resolve(ecopontosPorRegiao)
                } else {
                    this.dividePorRegiao(ecopontos, indiceAtual + 1, ecopontosPorRegiao).then(() => {
                        resolve(ecopontosPorRegiao)
                    }).catch((erro) => {
                        reject(erro)
                    })
                }
                }).catch((erro) => {
                    reject(erro)
                })
        })
    }

    /**
     * Busca a região de um ecoponto por meio de sua latitude e sua longitude
     * @param ecoponto Ecoponto que se deseja encontrar a região
    */
    buscaRegiaoDoEcoponto(ecoponto) {
        // Requisita NodeGeocoder
        var NodeGeocoder = require('node-geocoder')
        // Requisita regioes
        var regioes = require('./../constantes/regioes')

        return new Promise((resolve, reject) => {
            var latlng = {lat: parseFloat(-3.091347), lng: parseFloat(-60.017486)}

            var options = {
                provider: 'google',
                httpAdapter: 'https',
                apiKey: 'AIzaSyARyLoGeD0pusU8Yq_FpUVk71Y1VSGmm-s',
                formatter: null
            };

            var geocoder = NodeGeocoder(options);

            //Utiliza a API NodeGeocoder para encontrar o bairro em que o ecoponto está localizado
            geocoder.reverse({ lat: parseFloat(ecoponto.latitude), lon: parseFloat(ecoponto.longitude) }, function(err, res) {
                // Percorre as regiões armazenadas localmente
                for (var i = 0; i < regioes.length; i++) {
                    // Percorre os bairros dentro de uma região armado localmente
                    for (var j = 0; j < regioes[i].bairros.length; j++) {
                        // Verifica se o bairro atual e igual ao bairro do ecoponto
                        if (regioes[i].bairros[j] == res[0].extra.neighborhood) {
                            resolve(regioes[i].nome)
                        }
                    }
                }

                resolve("sem-zona")

            }).catch(erro => {
                reject(erro)
            });
        })
    }

    /**
     * Cria nova rota
     * @param grafo grafo a ser encontrada uma nova rota
    */
    criaRota(grafo) {
        var Dijkstra = require('./Dijkstra')

        let dijkstra = new Dijkstra()

        dijkstra.executar(grafo.getMatrizDeAdjacencia(), 0)
        console.log(dijkstra.getArrayVertices())
    }
}

module.exports = GeradorDeRota;