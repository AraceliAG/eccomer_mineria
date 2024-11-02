var con = require('../config/conection')
var producto = require('../model/querys')
module.exports={



    index:function(req, res){

        producto.obtener(con, function(err, datos){
            console.log(datos)
            res.render('productos/index', {title:'Aplication', productos:datos})
        })

    }
}