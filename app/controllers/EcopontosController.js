var Ecoponto = require('../models/Ecoponto.js')

module.exports = {
    async lista_ecopontos(req, res){
        Ecoponto.find().then((ecoponto) => {
            console.log("Encontroou")
            res.send(ecoponto)
        }).catch((erro) => {
            console.log("Nao Encontroou")
            res.send(erro)
        })
        // try{
        //     var ecopontos = await Ecopontos.find()
        //     console.log("Entrou lista")
        //     res.send(ecopontos)
        // }
        // catch{
        //     console.log('Erro no BD!')
        // }
        
    },
    async cadastrar_ecopontos(req, res){
        var ecoponto = new Ecoponto()
        ecoponto = req.body.ecoponto;
        ecoponto.status = "Inativo"
       
        // Criando IDs 
        
        Ecoponto.countDocuments({}, function(err, result) {
            if (err) {
              console.log(err);
            }
        }).then((qtd) => {
            console.log("valor de contagem: " + qtd)

            // Zerando os valores iniciais]

            ecoponto.ecopontoID = qtd + 1
            ecoponto.nivelCheio = 0
            ecoponto.temperatura = 0
            ecoponto.nivelGas = 0
            ecoponto.ultimaColeta = 0

            Ecoponto.create(ecoponto).then((ecoponto) =>{
                console.log("Ecoponto adicionado")
            }).catch(() =>{
                console.log("erro ao adicionar!")
            })

            return res.json(ecoponto)
        });

    },
    async teste(req, res) {
        return res.send("<html><body>Testezinho 22</body></html>")
    },
    async buscar_ecoponto(req, res) {
        var id_busca = req.body
        var ecoponto = new Ecoponto()

        console.log("JSON ID: ")
        console.log(id_busca)

        Ecoponto.find(id_busca).then((ecoponto) => {
            console.log(ecoponto)
            res.send(ecoponto)
        }).catch((erro) => {
            console.log("Nao Encontroou")
            res.send(erro)
        })
    },
    async atualizar_ecoponto (req, res) {
        var ecoponto = req.body.ecoponto
        var id = ecoponto.ecopontoID

        Ecoponto.update({ecopontoID: id}, ecoponto).then(()=>{
            console.log("Ecoponto Atualizado!")
        }).catch((erro) =>{
            console.log("Erro ao atualizar!")
        })

        return res.json(ecoponto)
    },
    async desativar_ecoponto(req, res) {
        var id = req.body

        Ecoponto.update(id, {status: "Desativado"}).then(()=>{
            console.log("Ecoponto desativado!")
        }).catch((erro) =>{
            console.log("Erro ao desativar!")
        })

        return res.json(id)
    },
    async reativar_ecoponto(req, res) {
        var id = req.body

        Ecoponto.update(id, {status: "Ativo"}).then(()=>{
            console.log("Ecoponto ativado!")
        }).catch((erro) =>{
            console.log("Erro ao ativar!")
        })

        return res.json(id)
    }
}