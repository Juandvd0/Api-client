const net = require('net');
const readline = require('readline-sync')
const express = require('express');
const app = express();
const os = require('os');
  
//var ipServer= obtainIp().toString();
//console.log(ipServer);
const options = {
    port: 4000,
    host: obtainIp()
}

const client = net.createConnection(options)

client.on('connect', ()=>{
    console.log('Conexión satisfactoria!!')
    sendLine()
})

client.on('data', (data)=>{
    console.log('El servidor dice:\n' + data)
    sendLine()
})

client.on('error', (err)=>{
    console.log(err.message)
})

function obtainIp(){
    var line;
   line = +readline.question('\nDigite la ip del servidor:\t') 
   return line;
}
//var file_json={"name":hostname, "hora":now,"message": message};

function sendLine() {
var hostname=os.hostname();
var today= new Date();

var now=today.toLocaleString();

    var line = readline.question('\nDigite el mensaje que desea enviar:\t')
    if (line == "0") {
        client.end()
    }else{
        var file_json={"name":hostname, "fecha": today,"hora":today.getHours(),"minutos":today.getMinutes(),
        "segundos":today.getSeconds(),"milisegundos":today.getMilliseconds(),"message": line};
        client.write(JSON.stringify(file_json));
        var actData = client.read();
        console.log(actData);
       // console.log("\n"+client.read());
    }
}