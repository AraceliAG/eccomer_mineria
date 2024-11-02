//CONEXIÓN PARA NUETRA BD

var mysql  = require("mysql");

var con = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
});

//VERIFICAR LA CONEXIÓN
con.connect((err)=>{
    if(!err){
        console.log("CONEXIÓN ÉXITOSA")
    }else{
        console.log("OCURRIÓ ALGO MAL")
    }
});


//PARA UTILIZAR ESTE MODULO DEBEMOS EXPORTARLO

module.exports=con;