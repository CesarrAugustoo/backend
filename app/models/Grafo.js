class Grafo {

    constructor() {
        // Vertices do Grafo
        this.vertices = []
        // Arestas do Grafo
        this.arestas = []
        // Matriz de Adjacência gerada pelo Grafo
        this.matrizAdjacencia = []        
    }

    /**
     * Adiciona Vértice
     * * Este método adiciona um vértice ao grafo
     * @param rotulo Rótulo é a identificação do vértice
     * @param peso Peso é a importância do vertice
    */
    addVertice(rotulo, peso) {
        // Cria uma instância de Vértice
        const vertice = new Vertice()
        vertice.rotulo = rotulo
        vertice.peso = peso

        // Adiciona a lista de vértices
        this.vertices.push(vertice)

        this.ordenaListaDeVerticesPorPesoDec()
        this.atualizaMatrizAdjacencia()

        return vertice
    }

    /**
     * Adiciona Aresta
     * * Este método adiciona uma aresta ao grafo
     * @param vertice1 Vértice1 é o primeiro vértice da aresta
     * @param vertice2 Vértice2 é o segundo vértice da aresta
    */
    addAresta(vertice1, vertice2, peso) {
        // Cria uma instância de Aresta
        const aresta = new Aresta()
        aresta.vertice1 = vertice1
        aresta.vertice2 = vertice2
        aresta.peso = peso

        //Adiciona a lista de arestas
        this.arestas.push(aresta)

        this.atualizaMatrizAdjacencia()

        return aresta
    }

    /**
     * Ordena Lista de Vértices por Peso Decrescente
     * * Este método ordena a lista de vertices do grafo por ordem descrescente de peso
    */
    ordenaListaDeVerticesPorPesoDec() {
        this.vertices.sort(function(a,b) { return parseFloat(b.peso) - parseFloat(a.peso) } );
    }

    /**
     * Atualiza Matriz de Adjacência
     * * Este método atualiza a matriz de adjacência de acordo com os vértices e as arestas 
     * do grafo
    */
    atualizaMatrizAdjacencia() {
        this.matrizAdjacencia = []

        // Inicializa a matriz de adjacência de acordo com a quantidade de vértices
        for (var i = 0; i < this.vertices.length; i++) {
            this.matrizAdjacencia.push(Array(this.vertices.length).fill(0.0))
        }

        // Percorre todas as linhas da matriz de adjacência
        for (var i = 0; i < this.matrizAdjacencia.length; i++) {
            // Percorre todas as colunas da matriz de adjacência
            for (var j = 0; j < this.matrizAdjacencia[i].length; j++) {
                this.arestas.forEach((aresta) => {
                    // Verifica se a aresta pertence aos vértices do grafo
                    if (aresta.vertice1.rotulo == this.vertices[i].rotulo && aresta.vertice2.rotulo == this.vertices[j].rotulo) {
                        // Seta o peso da posição atual da matriz de adjacência
                        this.matrizAdjacencia[i][j] = aresta.peso
                    }
                })
            }
        }
    }

    /**
     * Pega Matriz de Adjacência
     * * Este método devolve a matriz de adjacência do grafo.
    */
    getMatrizDeAdjacencia() {
        return this.matrizAdjacencia
    }
}

class Vertice {

    constructor() {
        // Rótulo do Vértice
        this.rotulo
        // Peso do Peso
        this.peso
    }

}

class Aresta {

    constructor() {
        // Vértice da Aresta
        this.vertice1
        // Vértice da Aresta
        this.vertice2
        // Peso da Aresta
        this.peso
    }

}

module.exports = Grafo;