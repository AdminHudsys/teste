const http = require("http");
const express = require("express");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
var mysql = require("mysql");
var configDB = require('./configDB.js');
var bodyParser = require('body-parser');



//http://localhost:3000/API

app.use(express.json());

app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: false
}));
app.use(bodyParser.json({limit: "50mb"})
);

app.get("/APIConsulta/:id", function(req, res) {

  console.log('Data: ' + req.params.id);
  const connection = mysql.createConnection(configDB);
  connection.query("select codigo_amostra,droga_nome,laudo from Tb_TesteAmostraDroga where codigo_amostra = ? order by droga_nome desc",[req.params.id], function (err, data) {
    console.log("Connect...");     
    if (err) console.log('Error BD: ' + err);
    connection.end();
    res.send(JSON.stringify(data));
  });
    
});

app.post("/API", function(req, res) {

    var laudo = "";
    var codigo_amostra = "";
    var laudo_final = "";
    
    var nota_cocaina = "";
    var nota_Benzoilecgonina = "";
    var Cocaetileno = "";
    var Norcocaína = "";

    var jsonAmostra = JSON.parse(JSON.stringify(req.body));

    const nota_corte = [
      {codigo: '01', droga_nome: 'Cocaína', nota: 0.50, derivado: ''},
      {codigo: '01a', droga_nome: 'Benzoilecgonina', nota: 0.05, derivado: 'Cocaína'},
      {codigo: '01b', droga_nome: 'Cocaetileno', nota: 0.05, derivado: 'Cocaína'},
      {codigo: '01c', droga_nome: 'Norcocaína', nota: 0.05, derivado: 'Cocaína'},
      {codigo: '02', droga_nome: 'Anfetamina', nota: 0.2, derivado: ''},
      {codigo: '03', droga_nome: 'Metanfetamina', nota: 0.2, derivado: ''},
      {codigo: '04', droga_nome: 'MDA', nota: 0.20, derivado: ''},
      {codigo: '05', droga_nome: 'MDMA', nota: 0.20, derivado: ''},
      {codigo: '06', droga_nome: 'THC', nota:0.05, derivado: ''},
      {codigo: '07', droga_nome: 'Morfina', nota: 0.2, derivado: ''},
      {codigo: '08', droga_nome: 'Codeína', nota: 0.2, derivado: ''},
      {codigo: '09', droga_nome: 'Heroína', nota: 0.2, derivado: ''},
    ];
    
    for(var drogaNome in jsonAmostra) {

      try {        

        laudo = "";
        codigo_amostra = drogaNome == "codigo_amostra" ? jsonAmostra[drogaNome] : codigo_amostra;
      
        var pesquisaNotaCorte = nota_corte.find( droga => droga.droga_nome === drogaNome);
        if(pesquisaNotaCorte != undefined && codigo_amostra != "codigo_amostra"){

          if(jsonAmostra[drogaNome] >= pesquisaNotaCorte.nota){
  
            laudo = "positivo";
            laudo_final = pesquisaNotaCorte.derivado == "" ? "positivo" : laudo_final; 

            if(drogaNome == 'Cocaína'){
              nota_cocaina =  jsonAmostra[drogaNome];
            }else if(drogaNome == 'Benzoilecgonina'){
              nota_Benzoilecgonina =  jsonAmostra[drogaNome];
            }else if(drogaNome == 'Cocaetileno'){
              Cocaetileno =  jsonAmostra[drogaNome];
            }else if(drogaNome == 'Norcocaína'){
              Norcocaína =  jsonAmostra[drogaNome];
            }
  
          }else{
            laudo = "negativo";
            laudo_final = laudo_final == "positivo" ? "positivo" : "negativo";   
          }
                    
          const connection = mysql.createConnection(configDB);
          connection.query("insert into Tb_TesteAmostraDroga (codigo_amostra, droga_codigo, droga_nome, nota, laudo, nota_corte) values (?,?,?,?,?,?)",[codigo_amostra,pesquisaNotaCorte.codigo,drogaNome,jsonAmostra[drogaNome],laudo,pesquisaNotaCorte.nota],
            function (err, data) {
              if (err) console.log("Error BD:: " + err);
                connection.end();
            }
          );   
        
        }

      } catch (error) {
        console.log('Error: ' + error);
      }

    }

    if(nota_cocaina == ""){
      laudo_final = laudo_final == "positivo" ? "positivo" : "negativo";  
    }else{

      if(nota_Benzoilecgonina != "" || Cocaetileno != "" || Norcocaína != ""){
        laudo_final = "positivo"; 
      }

    }

    const connection = mysql.createConnection(configDB);
    connection.query("insert into Tb_TesteAmostraDroga (codigo_amostra, droga_codigo, droga_nome, nota, laudo, nota_corte) values (?,?,?,?,?,?)",[codigo_amostra,'','',0,'Resultado da Amostra (' + codigo_amostra + ') é ' + laudo_final,0],
    function (err, data) {
      if (err) console.log("Error BD:: " + err);
        connection.end();
      }
    );   

    res.send('Resultado da Amostra (' + codigo_amostra + ') é ' + laudo_final);  
    
});

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));