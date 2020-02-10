var Ecoponto = require('../models/EcopontoModel.js')
var Status = require('../models/StatusController.json')

// Esse arquivo exporta os métodos para os ecopontos
module.exports = {
    // Retorna uma lista de todos os ecopontos
    // dentro do banco de dados mongo.
    async lista_ecopontos(req, res){
        // Se encontrar
        Ecoponto.find().sort({"status": Status.Ativo}).then((ecoponto) => {
            console.log("Encontroou")
            res.send(ecoponto)
        // Se não encontrar
        }).catch((erro) => {
            console.log("Nao Encontroou")
            res.send(erro)
        })
        // var ecoponto = req.body.ecoponto

        // // Update ecoponto, a partir do ID, usar o json mandado para atualizar
        // Ecoponto.updateMany({}, {"$set":{ status: int }}).then((listaecoponto)=>{
        //     // Se entrar no banco
            
        //     // Se não encontrar nenhum id no banco
        //     // 0 Documentos encontrados
        //     if(listaecoponto.n == 0){
        //         console.log("Ecoponto nao encontrado!")
        //         return res.json("Not found.")
        //     }
        //     // Se encontrar
        //     else{
        //         console.log("Ecoponto Atualizado!")
        //         return res.json(ecoponto)
        //     }
        // // Se não entrar no banco ou ocorrer qualquer erro.
        // }).catch((erro) =>{
        //     console.log("Erro ao atualizar!")
        //     return res.json(erro)
        // })
    },
    // Cadastrar ecopontos dentro do banco
    async cadastrar_ecopontos(req, res){
        var ecoponto = new Ecoponto()
        ecoponto = req.body.ecoponto;
        console.log(ecoponto)
       
        // Criando IDs, o ID será o numero de instancias no banco + 1
        // Isso criará um ID auto-incremental
        Ecoponto.countDocuments({}, function(err, result) {
            if (err) {
              console.log(err);
            }
        }).then((qtd) => {
            // Zerando os valores iniciais
            // Criar ID com quantidade + 1
            ecoponto.ecopontoID = qtd + 1
            ecoponto.nivelCheio = 0
            ecoponto.temperatura = 0
            ecoponto.nivelGas = 0
            ecoponto.ultimaColeta = 0

            // Adiciona o ecoponto ao banco
            Ecoponto.create(ecoponto).then((ecoponto) =>{
                console.log("Ecoponto adicionado")
                res.json(ecoponto)
            // Se ocorrer erro
            }).catch((erro) =>{
                console.log("erro ao adicionar!")
                console.log(erro)
                return res.json(ecoponto)
            })
        });
    },
    // Método que permite buscar um ecoponto dentro do banco
    // Esse método irá pegar o ID dentro da requisição e usá-lo
    // Para retornar um JSON inteiro, contendo todas as informações
    // dentro do banco
    async buscar_ecoponto(req, res) {
        var id_busca = req.body
        var ecoponto = new Ecoponto()

        console.log("JSON ID: ")
        console.log(id_busca)
        // Encontrar o motorista com esse ID
        Ecoponto.findOne(id_busca).then((ecoponto) => {
            // Se entrar no banco
            // Se não encontrar nenhum id no banco
            if(ecoponto == null) {
                res.send("Nao encontrou")
            }
            // Se encontrar
            else{
                res.send(ecoponto)
                console.log(ecoponto)
            }
        // Se não entrar no banco ou ocorrer qualquer erro.
        }).catch((erro) => {
            console.log("Erro na busca")
            res.send(erro)
        })
    },
    // Método que permite atualizar as informações do ecoponto dentro do banco.
    // Neste método, o usuário irá mandar uma requisição contendo 
    // todas as informações que ele deseja que sejam modificadas.
    // Além disso, o usuário deve mandar o ID do ecoponto a ser mudado.
    async atualizar_ecoponto (req, res) {
        var ecoponto = req.body.ecoponto
        var id = ecoponto.ecopontoID

        // Update ecoponto, a partir do ID, usar o json mandado para atualizar
        Ecoponto.updateOne({ecopontoID: id}, ecoponto).then((listaecoponto)=>{
            // Se entrar no banco
            // Se não encontrar nenhum id no banco
            // 0 Documentos encontrados
            if(listaecoponto.n == 0){
                console.log("Ecoponto nao encontrado!")
                return res.json("Not found.")
            }
            // Se encontrar
            else{
                console.log("Ecoponto Atualizado!")
                return res.json(ecoponto)
            }
        // Se não entrar no banco ou ocorrer qualquer erro.
        }).catch((erro) =>{
            console.log("Erro ao atualizar!")
            return res.json(erro)
        })
    },
    // Desativar ecoponto, permite modificar o status do ecoponto para INATIVO.
    // Neste método, o usuário será permitido mandar um ID, com isso,
    // O ecoponto que tiver esse ID no banco terá seu status modificado
    // para INATIVO.
    async desativar_ecoponto(req, res) {
        var id = req.body
        Ecoponto.updateOne(id, {status: Status.Inativo}).then((listaecoponto)=>{
            // Se entrar no banco

            // Se não encontrar nenhum ecoponto
            if(listaecoponto.n == 0) { // Se encontrar 0 documentos
                console.log("Ecoponto não encontrado!")
                return res.json("Not Found.")
            }
            //Se encontrar, modificar
            else {
                console.log("Ecoponto desativado!")
                return res.json("Done.")
            }
        }).catch((erro) =>{
            console.log("Erro ao desativar!")
            return res.json(id)
        })
    },
    // Desativar ecoponto, permite modificar o status do ecoponto para ATIVO.
    // Neste método, o usuário será permitido mandar um ID, com isso,
    // O ecoponto que tiver esse ID no banco terá seu status modificado
    // para ATIVO.
    async reativar_ecoponto(req, res) {
        var id = req.body

        Ecoponto.updateOne(id, {status: Status.Ativo}).then((ecoponto)=>{
            // Se entrar no banco
            // Se não encontrar nenhum ecoponto
            if(ecoponto.n == 0) { // Se encontrar 0 documentos
                console.log("Ecoponto não encontrado!")
                return res.json("Not Found.")
            }
            //Se encontrar, modificar
            else {
                console.log("Ecoponto ativado!")
                return res.json("Done.")
            }
        }).catch((erro) =>{
            console.log("Erro ao ativar!")
            return res.json(id)
        })
    },
    async deletar_ecopontos(req, res) {
        Ecoponto.deleteMany({}).then(()=>{
            res.send("Tudo deletado!")
        }).catch((erro) =>{
            res.send("Erro ao deletar!")
        })
    }
}