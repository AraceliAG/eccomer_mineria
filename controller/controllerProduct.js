var con = require('../config/conection')
var producto = require('../model/querys')
module.exports={



    index:function(req, res){ //VISUALIZACIÓN DE NUSTRO HOME PRINCIPAL

        producto.obtener(con, function(err, datos){ 
            console.log(datos)
            res.render('index', {title:'Aplication', productos:datos}) //PURO VER
        })

    },
    

    seleccion:function(req, res){ //PARA VER NUESTRA VISTA DE DESCRIP PRODUCTO DE SELECCIÓN
        
        const data = req.body
        console.log("envio de: ", data)
        // Guarda productoId en la sesión como un entero
        req.session.productoId = parseInt(data.productoId, 10);
        res.redirect("descripcion")
        
            
            
        
    },

    descrip:function(req,res){
        // RECUPETRAMOS LOS DATOS
        const productoId = req.session.productoId;


        console.log("Datos recuperados: ", productoId);

        producto.descripcionn(con, { idproductos: productoId }, function(err, datos) {

            console.log("datos: ", datos)

            res.render("descripcion", {productos:datos})

        })
            

    }
    

    
}