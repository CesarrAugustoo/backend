class Dijkstra {

    constructor() {
        // Matriz de Adjacência
    this.matrizAdjacencia = []
    // Lista de Distâncias da Origem
    this.distanciaDaOrigem = []
    // Lista de Booleanos indicando se é o Menor Caminho
    this.menorCaminho = []
    }

    /**
     * Este inicializa as listas necessárias ao algoritmo de Dijkstra
    */
    inicializa() {
        // Zera o vetor de distâncias da origem
        this.distanciaDaOrigem = []
        // Zera o vetor de booleanos de menor caminho
        this.menorCaminho = []

        // Preenche a lista de distâncias da origem e de menor caminho
        for (var i = 0; i < this.matrizAdjacencia.length; i++) {
            this.distanciaDaOrigem.push(Number.MAX_SAFE_INTEGER)
            this.menorCaminho.push(false)
        }
    }

    /**
     * Este método devolve o índice com a menor distância
    */
    distanciaMinima() {
        // Inicia com o maior inteiro possível
        var min = Number.MAX_SAFE_INTEGER
        // Inicia com o index = 0
        var min_index = 0

        // Percorre todo o vetor de menores caminhos
        for (var i = 0; i < this.matrizAdjacencia.length; i++) {
            // Verifica se o vértice atual já foi percorrido 
            if (!this.menorCaminho[i] && this.distanciaDaOrigem[i] < min) {
                // Seta o valor de minimo como a nova distância
                min = this.distanciaDaOrigem[i]
                // Seta o novo índice com a menor distância
                min_index = i
            }
        }

        return min_index
    }

    /**
     * Este método executa o algoritmo de Dijkstra de menor caminho
     * @param matrizAdjacencia Matriz de Adjacência do Grafo
     * @param origem Vértice inicial para execução do algoritmo de Dijkstra
    */
    executar(matrizAdjacencia, origem) {
        // Seta a matriz de adjacência
        this.matrizAdjacencia = matrizAdjacencia

        this.inicializa()

        // Seta a distância da origem para ela mesma como zero
        this.distanciaDaOrigem[origem] = 0.0

        // Percorre a matriz de adjacência
        for (var i = 0; i < matrizAdjacencia.length - 1; i++) {
            // Índice do vértice com a menor distância
            var u = this.distanciaMinima()

            // Seta o como true o vértice já percorrido
            this.menorCaminho[u] = true

            // Percorre a lista de menor caminho e de distâncias da origem
            for (var v = 0; v < matrizAdjacencia.length; v++) {
                // Verifica se o menor caminho ainda não foi percorrido
                // Verifica se a distância da origem do vértice atual é menor que o infinito
                // Verifica se a nova distância calculada é menor que a distância já calculada anteriormente
                if (!this.menorCaminho[v] && 
                    matrizAdjacencia[u][v] && 
                    this.distanciaDaOrigem[u] != Number.MAX_SAFE_INTEGER &&
                    this.distanciaDaOrigem[u] + matrizAdjacencia[u][v] < this.distanciaDaOrigem[v]) {
                        // Seta a nova distância da origem do vértice atual
                        this.distanciaDaOrigem[v] = this.distanciaDaOrigem[u] + this.matrizAdjacencia[u][v]

                }
            }
        }
    }

    /**
     * Ajusta as distâncias calculadas pelo algoritmo de Dijkstra
    */
    ajustaDistancias() {
        for (var i = 0; i < this.distanciaDaOrigem.length; i++) {
            if (this.distanciaDaOrigem[i] == Number.MAX_SAFE_INTEGER ) {
                this.distanciaDaOrigem[i] = -1
            }
        }
    }

    /**
     * Devolve a lista de distâncias da origem
    */
    getArrayVertices() {
        this.ajustaDistancias()

        return this.distanciaDaOrigem
    }
}

module.exports = Dijkstra;