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



/**
 * var latlng = {lat: parseFloat(-3.091347), lng: parseFloat(-60.017486)}
        //key: 'AIzaSyARyLoGeD0pusU8Yq_FpUVk71Y1VSGmm-s'
        
        var NodeGeocoder = require('node-geocoder');
        var regioes = require('./../constantes/regioes')
        var options = {
            provider: 'google',
           
            // Optional depending on the providers
            httpAdapter: 'https', // Default
            apiKey: 'AIzaSyARyLoGeD0pusU8Yq_FpUVk71Y1VSGmm-s', // for Mapquest, OpenCage, Google Premier
            formatter: null         // 'gpx', 'string', ...
        };

        var geocoder = NodeGeocoder(options);

        regioes.forEach((regiao) => {
            regiao.bairros.forEach((bairro) => {
                geocoder.geocode(bairro + 'Manaus, AM, Brazil', function(err, res) {
                    console.log(res[0].extra.neighborhood + '\t' + bairro);
                });
            })
        })

        // geocoder.reverse({ lat: parseFloat(-3.036567), lon: parseFloat(-60.015199) }, function(err, res) {
        //     console.log(res);
        // });
*/