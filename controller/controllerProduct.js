var con = require('../config/conection')
var producto = require('../model/querys')
module.exports={



    index:function(req, res){

        producto.obtener(con, function(err, datos){
            console.log(datos)
            res.render('productos/index', {title:'Aplication', productos:datos})
        })

    },
    

    seleccion:function(req, res){
        console.log(req.body);
        

        res.redirect("productos/descripcion")
            
            
        
    },

    descrip:function(req,res){
        res.render("productos/descripcion")
        // producto.descripcionn(con, req.body, function(err, datos){
            
        //     res.render("productos/descripcion",{productos:datos})
            
            
        // })
    }
    

    
}