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
        var AnalisadorDeEcoponto = require('./AnalisadorDeEcoponto')

        // Verifica ecopontos coletáveis
        let analisador = new AnalisadorDeEcoponto()
        let ecopontosColetaveis = analisador.devolveEcopontosProntosPraColeta(ecopontos)

        // Divide ecopontos coletáveis por região
        let regioes = this.dividePorRegiao(ecopontosColetaveis)
        
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
    dividePorRegiao(ecopontos) {
        return []
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