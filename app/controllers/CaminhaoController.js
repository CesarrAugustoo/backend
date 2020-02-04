var Caminhao = require('../models/CaminhaoModel.js')

// Esse arquivo exporta os métodos para o caminhão
module.exports = {

    // Retorna uma lista de todos os caminhões
    // dentro do banco de dados mongo.
    async lista_caminhoes(req, res){
        //Se encontrar
        Caminhao.find().sort({"status":1}).then((caminhao) => {
            console.log("Encontrou")
            res.send(caminhao)
        //Se não encontrar
        }).catch((erro) => {
            console.log("Nao Encontrou")
            res.send(erro)
        })
    },

    // Cadastrar caminhões dentro do banco
    async cadastrar_caminhao(req, res){
        var caminhao = new Caminhao()
        caminhao = req.body.caminhao;
       
        // Criando IDs, o ID será o numero de instancias no banco + 1
        // Isso criará um ID auto-incremental
        Caminhao.countDocuments({}, function(err, result) {
            if (err) {
              console.log(err);
            }
        }).then((qtd) => {
            // Criar ID com quantidade + 1
            caminhao.caminhaoID = qtd + 1

            //console.log("valor de contagem: " + qtd)
            //console.log(caminhao)

            // Adiciona o caminhão ao banco
            Caminhao.create(caminhao).then((caminhao) =>{
                console.log("Caminhao adicionado")
            // Se ocorrer erro
            }).catch((erro) =>{
                console.log("Erro ao adicionar!")
                console.log(erro)
                return res.json(caminhao)
            })

        });
    },

    // Método que permite buscar um caminhão dentro do banco
    // Esse método irá pegar o ID dentro da requisição e usá-lo
    // Para retornar um JSON inteiro, contendo todas as informações
    // dentro do banco
    async buscar_caminhao(req, res) {
        var id_busca = req.body
        var caminhao = new Caminhao()

        console.log("JSON ID: ")
        console.log(id_busca)

        // Encontrar o motorista com esse ID
        Caminhao.findOne(id_busca).then((caminhao) => {
            // Se entrar no banco
            
            // Se não encontrar nenhum id no banco
            if(caminhao == null) {
                res.send("Nao encontrou")
            }
            // Se encontrar
            else{
                res.send(caminhao)
            }
        // Se não entrar no banco ou ocorrer qualquer erro.
        }).catch((erro) => {
            console.log("Erro na busca")
            res.send(erro)
        })
    },

    // Método que permite atualizar as informações do caminhão dentro do banco.
    // Neste método, o usuário irá mandar uma requisição contendo 
    // todas as informações que ele deseja que sejam modificadas.
    // Além disso, o usuário deve mandar o ID do caminhão a ser mudado.
    async atualizar_caminhao (req, res) {
        var caminhao = req.body.caminhao
        var id = caminhao.caminhaoID

        // Update caminhao, a partir do ID, usar o json mandado para atualizar
        Caminhao.updateOne({caminhaoID: id}, caminhao).then((listacaminhao)=>{
            // Se entrar no banco
            
            // Se não encontrar nenhum id no banco
            // 0 Documentos encontrados
            if(listacaminhao.n == 0){
                console.log("Caminhao nao encontrado!")
                return res.json("Not found.")
            }
            // Se encontrar
            else{
                console.log("Caminhao Atualizado!")
                return res.json(caminhao)
            }
        // Se não entrar no banco ou ocorrer qualquer erro.
        }).catch((erro) =>{
            console.log("Erro ao atualizar!")
            return res.json(erro)
        })     
    },

    // Desativar caminhao, permite modificar o status do caminhao para INATIVO.
    // Neste método, o usuário será permitido mandar um ID, com isso,
    // O caminhao que tiver esse ID no banco terá seu status modificado
    // para INATIVO.
    async desativar_caminhao(req, res) {
        var id = req.body

         Caminhao.updateOne(id, {status: 9}).then((listacaminhao)=>{
            // Se entrar no banco
            
            // Se não encontrar nenhum id no banco
            // 0 Documentos encontrados
            if(listacaminhao.n == 0) {
                console.log("Caminhao não encontrado!")
                return res.json("Not Found.")
            }
            // Se encontrar
            else {
                console.log("Caminhao desativado!")
                return res.json("Done.")
            }
        // Se não entrar no banco ou ocorrer qualquer erro.
        }).catch((erro) =>{
            console.log("Erro ao desativar!")
            return res.json(erro)
        })
    },

    // Reativar caminhao, permite modificar o status do caminhao para ATIVO.
    // Neste método, o usuário será permitido mandar um ID, com isso,
    // O caminhao que tiver esse ID no banco terá seu status modificado
    // para ATIVO.
    async reativar_caminhao(req, res) {
        var id = req.body

        Caminhao.updateOne(id, {status: 1}).then((listacaminhao)=>{
            // Se entrar no banco
            
            // Se não encontrar nenhum id no banco
            // 0 Documentos encontrados
            if(listacaminhao.n == 0) {
                console.log("Caminhao não encontrado!")
                return res.json("Not Found.")
            }
            // Se encontrar
            else {
                console.log("Caminhao ativado!")
                return res.json("Done.")
            }
        // Se não entrar no banco ou ocorrer qualquer erro.
        }).catch((erro) =>{
            console.log("Erro ao ativar!")
            return res.json(erro)
        })
    }
}