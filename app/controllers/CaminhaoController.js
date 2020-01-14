var Caminhao = require('../models/Caminhao.js')

module.exports = {
    async lista_caminhoes(req, res){
        Caminhao.find().then((caminhao) => {
            console.log("Encontrou")
            res.send(caminhao)
        }).catch((erro) => {
            console.log("Nao Encontrou")
            res.send(erro)
        })
    },
    async cadastrar_caminhao(req, res){
        var caminhao = new Caminhao()
        caminhao = req.body.caminhao;
        //motorista.status = "Inativo"
       
        // Criando IDs 
        Caminhao.countDocuments({}, function(err, result) {
            if (err) {
              console.log(err);
            }
        }).then((qtd) => {
            console.log("valor de contagem: " + qtd)

            // Zerando os valores iniciais
            caminhao.caminhaoID = qtd + 1

            console.log(caminhao)
            Caminhao.create(caminhao).then((caminhao) =>{
                console.log("Caminhao adicionado")
            }).catch((erro) =>{
                console.log("Erro ao adicionar!")
                console.log(erro)
            })

            return res.json(caminhao)
        });
    },
    async buscar_caminhao(req, res) {
        var id_busca = req.body
        var caminhao = new Caminhao()

        console.log("JSON ID: ")
        console.log(id_busca)

        Caminhao.find(id_busca).then((caminhao) => {
            console.log(caminhao)
            res.send(caminhao)
        }).catch((erro) => {
            console.log("Nao Encontrou")
            res.send(erro)
        })
    }
}