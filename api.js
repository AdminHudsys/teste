var mysql = require("mysql");
var configDB = require('../configDB.js');

router.post('/',function (req, res) {


    res.send("ok...")

    // const connection  = mysql.createConnection(configDB);
    // connection.query("select id,razao,fantasia,cidade,servicos from TbSisFornecedor order by razao Limit 0,25;", function (err, data) {
    //   console.log("Connect...");     
    //   if (err) console.log('Error BD: ' + err);
    //   connection.end();
    //   res.render('Forms/Adm/AdmFornecedor/AdmFornecedor', { dados: data });
    // });       

})
