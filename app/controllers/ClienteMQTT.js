const mqtt = require('mqtt');  //MQTT
var Ecoponto = require('../models/EcopontoModel.js')

var config = {
    host: 'localhost',
    port: 1884,
}

var cliente = mqtt.connect(config); //Conectar o cliente com o Broker

//Inscrevendo em todos os subtópicos de ecopontos com QoS 2
cliente.subscribe({"ecopontos/#": {qos: 2}});

//Aguardando mensagens no tópico ecopontos
cliente.on('message', function (topic, message){ //O que o programa fará quando receber uma mensagem MQTT

    ecoponto = JSON.parse(message.toString())//Converte a mensagem em JSON
    console.log(ecoponto)
    console.log(topic) 

    //Atualiza as informações recebidas pelo cliente no Mongo DB
    var id = ecoponto.ecopontoID

    // Update ecoponto, a partir do ID, usar o json mandado para atualizar
    Ecoponto.updateOne({ecopontoID: id}, ecoponto).then((listaecoponto)=>{
        // Se não encontrar nenhum id no banco
        // 0 Documentos encontrados
        if(listaecoponto.n == 0){
            console.log("Ecoponto nao encontrado!")
        }
            // Se encontrar
        else{
            console.log("Ecoponto Atualizado!")
        }
        // Se não entrar no banco ou ocorrer qualquer erro.
    }).catch((erro) =>{
        console.log("Erro ao atualizar!")
    })
})