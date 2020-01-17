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
            if(caminhao.body == null) {
                res.send("Nao encontrou")
            }
            else{
                res.send(caminhao)
            }
        }).catch((erro) => {
            console.log("Erro na busca")
            res.send(erro)
        })
    },
    async atualizar_caminhao (req, res) {
        var caminhao = req.body.caminhao
        var id = caminhao.caminhaoID

        Caminhao.updateOne({caminhaoID: id}, caminhao).then((callback)=>{
            if(callback.n == 0){
                console.log("Caminhao nao encontrado!")
                return res.json("Not found.")
            }
            else{
                console.log("Caminhao Atualizado!")
                return res.json(caminhao)
            }
        }).catch((erro) =>{
            console.log("Erro ao atualizar!")
            return res.json("Error")
        })     
    },
    async desativar_caminhao(req, res) {
        var id = req.body

         Caminhao.updateOne(id, {status: "Inativo"}).then((callback)=>{
            if(callback.n == 0) {
                console.log("Caminhao não encontrado!")
                return res.json("Not Found.")
            }
            else {
                console.log("Caminhao desativado!")
                return res.json("Done.")
            }
        }).catch((erro) =>{
            console.log("Erro ao desativar!")
            console.log(erro)
            return res.json("Error.")
        })
    },
    async reativar_caminhao(req, res) {
        var id = req.body

        Caminhao.updateOne(id, {status: "Ativo"}).then((callback)=>{
            if(callback.n == 0) {
                console.log("Caminhao não encontrado!")
                return res.json("Not Found.")
            }
            else {
                console.log("Caminhao ativado!")
                return res.json("Done.")
            }
        }).catch((erro) =>{
            console.log("Erro ao ativar!")
            console.log(erro)
            return res.json("Error.")
        })
    }
}