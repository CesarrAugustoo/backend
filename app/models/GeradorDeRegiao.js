class GeradorDeRegiao {
    
    /**
     * Este método devolve os bairros por região de Manaus
    */
    geraRegiaoPorGeografia() {
        // Requisita o arquivo de regiões
        var regioes = require('./../constantes/regioes')

        return regioes
    }

    /**
     * Este método devolve as regiões baseada em densidade de ecopontos
     * TODO: Este método será implementado futuramente
    */
    geraRegiaoPorDensidade() {

    }
}

module.exports = GeradorDeRegiao