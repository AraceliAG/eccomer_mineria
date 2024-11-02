var con = require('../config/conection')

module.exports={
    index:function(req, res){

        res.render('indexP',{title:'Aplication'});
        con.query("SELECT*FROM test", function(err, datos){
            console.log(datos);
        })

    }
}