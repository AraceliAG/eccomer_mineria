var con = require('../config/conection')
var producto = require('../model/querys')
module.exports={

    login:function(req, res){
        

        res.render('login')
    },

    inicio:function(req, res) {
        const inicio = req.body;
        console.log(req.body);
    
        producto.inicioSesion(con, inicio.correo, inicio.contrasenia, function(err, datos) {
    
            console.log("datos: ", datos);
            console.log("correo dentro de la función:", inicio.correo);
            console.log("contraseña dentro de la función:", inicio.contrasenia);
            
            if (err) {
                console.error("Error en la consulta: ", err);
                return res.status(500).send('Error en el servidor');
            }
            
            if (!datos.length) { //SI NO SE ENCUENTRAN LOS DATOS REGRESA EL MENSAJE
                return res.status(401).send('Correo o contraseña incorrectos');
            }
            
            //SI EXISTE REDIREDIGE AL INDEX
            res.redirect('index');
        });
    },
    


    index:function(req, res){ //VISUALIZACIÓN DE NUSTRO HOME PRINCIPAL
        //PARA REALIZAR MÁS DE UNA CONSULTAS SE TIENEN QUE AGREGAR COMO SE VE AQUI PRODUCTO>PRODUCTO>PRODUCTO Y SE MANDAN
        producto.obtener(con, function(err, datos){ 

        producto.obtener2(con, function(err, datos2){

        producto.veterinaria(con, function(err, datos3){
            
        producto.salud(con, function(err, datos4){

        producto.alimento(con, function(err, datos5){
            res.render('index', {title:'Aplication', productos:datos, productos2:datos2, veterinaria:datos3, salud:datos4, alimento:datos5}) //PURO VER

        })

        
        })
        
        })
        
       
        
        })
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

        producto.descripcionn(con, { id_productos: productoId }, function(err, datos) {

            console.log("datos: ", datos)

            res.render("descripcion", {productos:datos})

        })
            

    },

    verFavoritos:function(req, res){


        res.render("favoritos")
    }
    

    
}