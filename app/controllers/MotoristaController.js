var Motorista = require('../models/Motorista.js')

module.exports = {
    async lista_motoristas(req, res){
        Motorista.find().then((motorista) => {
            console.log("Encontrou")
            res.send(motorista)
        }).catch((erro) => {
            console.log("Nao Encontrou")
            res.send(erro)
        })
    },
    async cadastrar_motorista(req, res){
        var motorista = new Motorista()
        motorista = req.body.motorista;
        //motorista.status = "Inativo"
       
        // Criando IDs 
        Motorista.countDocuments({}, function(err, result) {
            if (err) {
              console.log(err);
            }
        }).then((qtd) => {
            console.log("valor de contagem: " + qtd)

            // Zerando os valores iniciais
            motorista.motoristaID = qtd + 1

            console.log(motorista)
            Motorista.create(motorista).then((motorista) =>{
                console.log("Motorista adicionado")
            }).catch((erro) =>{
                console.log("Erro ao adicionar!")
                console.log(erro)
            })

            return res.json(motorista)
        });
    },
    async buscar_motorista(req, res) {
        var id_busca = req.body
        var motorista = new Motorista()

        console.log("JSON ID: ")
        console.log(id_busca)

        Motorista.find(id_busca).then((motorista) => {
            if(motorista.body == null) {
                res.send("Nao encontrou")
            } else{
            res.send(motorista) }
        }).catch((erro) => {
            console.log("Erro na busca")
            res.send(erro)
        })
    }
}