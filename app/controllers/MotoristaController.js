var Motorista = require('../models/MotoristaModel.js')

// Esse arquivo exporta métodos para a parte do motorista
module.exports = {

    // Retorna uma lista de todos os motoristas
    // dentro do banco de dados mongo.
    async lista_motoristas(req, res){
        // Se encontrar
        Motorista.find().then((motorista) => {
            console.log("Encontrou")
            res.send(motorista)
        // Se não
        }).catch((erro) => {
            console.log("Nao Encontrou")
            res.send(erro)
        })
    },

    // Cadastra um motorista dentro do banco
    async cadastrar_motorista(req, res){
        var motorista = new Motorista()
        motorista = req.body.motorista;
        // Criando IDs, o ID será o numero de instancias no banco + 1
        // Isso criará um ID auto-incremental
        Motorista.countDocuments({}, function(err, result) {
            if (err) {
              console.log(err);
            }
        }).then((qtd) => {
            // Quantidade + 1
            console.log("valor de contagem: " + qtd)
            motorista.motoristaID = qtd + 1

            console.log(motorista)

            // Adiciona o motorista ao banco
            Motorista.create(motorista).then((motorista) =>{ 
                console.log("Motorista adicionado")
            // Se não
            }).catch((erro) =>{
                console.log("Erro ao adicionar!")
                console.log(erro)
            })

            return res.json(motorista)
        });
    },

    // Método que permite buscar um motorista dentro do banco
    // Esse método irá pegar o ID dentro da requisição e usá-lo
    // Para retornar um JSON inteiro, contendo todas as informações
    // do motorista dentro do banco
    async buscar_motorista(req, res) {
        var id_busca = req.body
        var motorista = new Motorista()

        console.log("JSON ID: ")
        console.log(id_busca)
        // Encontrar o motorista com esse ID
        Motorista.findOne(id_busca).then((motorista) => {
            // Entra se entrar no banco
            
            // Se não encontrar ninguém com esse id
            if(motorista == null) {
                res.send("Nao encontrou")
            }
            // Se encontrar, devolve o json do motorista
            else{
                res.send(motorista)
            }
        // Se der qualquer erro na hora de entrar no banco
        }).catch((erro) => {
            console.log("Erro na busca")
            res.send(erro)
        })
    },

    // Método que permite atualizar as informações do motorista dentro do banco.
    // Neste método, o usuário irá mandar uma requisição contendo 
    // todas as informações que ele deseja que sejam modificadas.
    // Além disso, o usuário deve mandar o ID do motorista a ser mudado.
    async atualizar_motorista (req, res) {
        var motorista = req.body.motorista
        var id = motorista.motoristaID

        // Update motorista, a partir do ID, usar o json mandado para atualizar
        Motorista.updateOne({motoristaID: id}, motorista).then((listamotorista)=>{
            // Se entrar no banco
            
            // Se não encontrar nenhum id no banco
            // 0 Documentos encontrados
            if(listamotorista.n == 0){
                console.log("Motorista nao encontrado!")
                return res.json("Not found.")
            }
            // Se encontrar
            else{
                console.log("Motorista Atualizado!")
                return res.json(motorista)
            }
        // Se não entrar no banco ou ocorrer qualquer erro.
        }).catch((erro) =>{
            console.log("Erro ao atualizar!")
            return res.json(erro)
        })
    },

    // Desativar motorista, permite modificar o status do motorista para INATIVO.
    // Neste método, o usuário será permitido mandar um ID, com isso,
    // O motorista que tiver esse ID no banco terá seu status modificado
    // para INATIVO.
    async desativar_motorista(req, res) {
        var id = req.body

        // A partir do ID, modificar o status para INATIVO
         Motorista.updateOne(id, {status: "Inativo"}).then((listamotorista)=>{
            // Se entrar no banco

            // Se não encontrar nenhum motorista
            if(listamotorista.n == 0) { // Se encontrar 0 documentos
                console.log("Motorista não encontrado!")
                return res.json("Not Found.")
            }
            // Se encontrar
            else { 
                console.log("Motorista desativado!")
                return res.json("Done.")
            }
        // Se não conseguir entrar no banco ou ocorrer qualquer erro
        }).catch((erro) =>{
            console.log("Erro ao desativar!")
            return res.json(erro)
        })
    },

    // Reativar motorista, permite modificar o status do motorista para ATIVO.
    // Neste método, o usuário será permitido mandar um ID, com isso,
    // O motorista que tiver esse ID no banco terá seu status modificado
    // para ATIVO.
    async reativar_motorista(req, res) {
        var id = req.body

        // A partir do ID, modificar os status para ATIVO
        Motorista.updateOne(id, {status: "Ativo"}).then((listamotorista)=>{
            // Se entrar no banco

            // Se não encontrar nenhum motorisa
            if(listamotorista.n == 0) { // Se encontrar 0 documentos
                console.log("Motorista não encontrado!")
                return res.json("Not Found.")
            }
            //Se encontrar, modificar
            else {
                console.log("Motorista ativado!")
                return res.json("Done.")
            }
        // Se não entrar no banco ou a qualquer erro.
        }).catch((erro) =>{
            console.log("Erro ao ativar!")
            return res.json(erro)
        })
    }
}