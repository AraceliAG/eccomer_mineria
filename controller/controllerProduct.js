var con = require('../config/conection')
var producto = require('../model/querys')
module.exports={



    index:function(req, res){ //VISUALIZACIÓN DE NUSTRO HOME PRINCIPAL

        producto.obtener(con, function(err, datos){ 
            console.log(datos)
            res.render('productos/index', {title:'Aplication', productos:datos}) //PURO VER
        })

    },
    

    seleccion:function(req, res){ //PARA VER NUESTRA VISTA DE DESCRIP PRODUCTO DE SELECCIÓN
        console.log(req.body);
        res.render("productos/descripcion")
        
            
            
        
    },

    descrip:function(req,res){
        res.render("productos/descripcion")
        // producto.descripcionn(con, req.body, function(err, datos){
            
        //     res.render("productos/descripcion",{productos:datos})
            
            
        // })
    }
    

    
}