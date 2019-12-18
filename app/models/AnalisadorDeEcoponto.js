class AnalisadorDeEcoponto {

    /**
     * Esta função verifica, a partir de uma lista de ecopontos, quais estão prontos
     * para serem coletados
     * @param listaOriginal Lista com todos os ecopontos
    */
    devolveEcopontosProntosPraColeta(listaOriginal) {
        // Cria um vetor que irá conter todos os ecopontos coletáveis
        var ecopontos = []

        // Percorre a lista original de ecopontos e adiciona na lista de ecopontos coletáveis
        for (var i = 0; i < listaOriginal.length; i++) {
            // Verifica as condições necessárias para um ecopontos ser coletável:
            // Primeira condição: nível de enchimento se maior que 80%
            // Segunda condição: dias sem coleta maior que dois e nível de enchimento maior que 20%
            if (listaOriginal[i].nivel >= 80 || (listaOriginal[i].diasSemColeta > 2 && listaOriginal[i].nivel >= 20)) {
                ecopontos.push(listaOriginal[i])
            }
        }

        // retorna lista de ecopontos
        return ecopontos
    }
}

module.exports = AnalisadorDeEcoponto