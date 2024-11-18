var con = require('../config/conection')
var producto = require('../model/querys')
module.exports={


    //- FUNCION PARA MOSTRAR EL LOGIN PRINCIAPAL 
    login:function(req, res){
        
        res.render('login')
    },

    //- VERIFICACION SI EXISTE EL USUARIO
    inicio:function(req, res) {
        const inicio = req.body; //*ESTO ES EL DATO QUE SE MANDA DEL FORMULARIO DE LA VISTA
        console.log(req.body);
    
        producto.inicioSesion(con, inicio.correo, inicio.contrasenia, function(err, datos) {
    
            console.log("datos: ", datos);
            console.log("correo dentro de la función:", inicio.correo);
            console.log("contraseña dentro de la función:", inicio.contrasenia);
            
            if (err) {
                console.error("Error en la consulta: ", err);
                return res.status(500).send('Error en el servidor');
            }
            
            if (!datos.length) { //--SI NO SE ENCUENTRAN LOS DATOS REGRESA EL MENSAJE
                return res.status(401).send('Correo o contraseña incorrectos');
            }

            

            const datosUsuario = datos[0];
            console.log("se va enviar este dato: ", datosUsuario)
            req.session.usuario = datosUsuario;
            
            //--SI EXISTE REDIREDIGE AL INDEX
            res.redirect('index');
        });
    },
    

    //- FUNCION PARA MOSTRAR LOS PRODUCTOS POR DEPARTAMENTO EN EL HOME PRINCIPAL

    index:function(req, res){ 
        //--PARA REALIZAR MÁS DE UNA CONSULTAS SE TIENEN QUE AGREGAR COMO SE VE AQUI PRODUCTO>PRODUCTO>PRODUCTO Y SE MANDAN
        const usuario = req.session.usuario;
        console.log("hola acabo de llegar xD: ", usuario  )
        
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
    

    //-PARA VER NUESTRA VISTA DE DESCRIP PRODUCTO AL MOMENTO DE SELECCIONAR UN PRODUCTO EN EL INICIO
    seleccion:function(req, res){ 
        const usuario = req.session.usuario;
        
        const data = req.body
        console.log("hola acabo de llegar xD descripsion: ", usuario  )
        console.log("envio de: ", data)
        // Guarda productoId en la sesión como un entero
        req.session.productoId = parseInt(data.productoId, 10);
        res.redirect("descripcion")
        
    },

    //-AQUI SE MUESTRA LOS DATOS DEL PRODUCTO SELECCIONADO 
    descrip:function(req,res){
        //* RECUPETRAMOS LOS DATOS
        const productoId = req.session.productoId;


        console.log("Datos recuperados: ", productoId);

        producto.descripcionn(con, { id_productos: productoId }, function(err, datos) {

            console.log("datos: ", datos)

            res.render("descripcion", {productos:datos})

        })
            

    },

    // - AQUI ES PARA VER LOS FAVORITOS DEL USAURIO 
    verFavoritos:function(req, res){
        const usuario = req.session.usuario;
        console.log("hola acabo de llegar xD favoritos: ", usuario  )

        const id = usuario[0]
        console.log("este es el id ", usuario.id_usuario)
        producto.verFav(con, usuario.id_usuario, function(err,datos){

            console.log(datos)
            res.render("favoritos", {productos:datos})

        })

        
        
    }, 


    // - AGREGAR FAVORITOS
agregar_favorito: function (req, res) {
    const usuario = req.session.usuario;
    const idProducto = req.body.idproductos;

    console.log("Usuario para agregar favoritos:", usuario.id_usuario);
    console.log("Producto para agregar favoritos:", idProducto);

    producto.agregar_fav(con, usuario.id_usuario, idProducto, (err) => {
        if (err) {
            console.error("Error al agregar favorito:", err);
            return res.status(500).send("Error al agregar favorito");
        }

        res.redirect("descripcion");
    });
},

agregarAlCarrito: function (req, res) {
    const usuario = req.session.usuario; // *USUARIO
    const idUsuario = usuario.id_usuario;
    const idProducto = req.body.id_productos_C; // *PRODUCTO DESDE EL FORM 

    console.log("Usuario para carrito:", idUsuario);
    console.log("Producto para carrito:", idProducto);

    // --COMIENZO DE TRANSACCIÓN
    con.beginTransaction((err) => {
        if (err) {
            console.error("Error al iniciar transacción:", err);
            return res.status(500).send("Error al iniciar transacción");
        }

        // --INSERTAR EN LA TABLA 
        producto.insertarCarrito(con, idUsuario, (err, result) => {
            if (err) {
                console.error("Error al insertar en carrito:", err);
                return con.rollback(() => {
                    res.status(500).send("Error al insertar en carrito");
                });
            }

            console.log("Resultado de insertarCarrito:", result); 
            const idCarrito = result.insertId; // --ID DEL CARRITO CREADO

            if (!idCarrito) {
                console.error("No se obtuvo un ID válido del carrito.");
                return con.rollback(() => {
                    res.status(500).send("No se pudo obtener el ID del carrito");
                });
            }

            console.log("ID del carrito insertado:", idCarrito); // --COMPROBAR EL ID DEL CARRITO

            // -FUNCIÓN PARA INSERTAR AL CARRITO DE PRODUCTOS
            producto.insertarCarritoProducto(con, idCarrito, idProducto, (err) => {
                if (err) {
                    console.error("Error al insertar en carrito_producto:", err);
                    return con.rollback(() => {
                        res.status(500).send("Error al insertar en carrito_producto");
                    });
                }

                // -- CONFIRMAR TRANSACCION
                con.commit((err) => {
                    if (err) {
                        console.error("Error al confirmar transacción:", err);
                        return con.rollback(() => {
                            res.status(500).send("Error al confirmar transacción");
                        });
                    }

                    console.log("Producto agregado al carrito con éxito");
                    
                });
            });
        });
    });
},


//
verCarrito:function(req, res){
    const usuario = req.session.usuario;
    console.log("hola acabo de llegar xD verCarrito: ", usuario  )

    console.log("este es el id ", usuario.id_usuario)

    producto.verCarr(con, usuario.id_usuario, function(err,datos){

        

        console.log(datos)


        // *SUMAR PRECIO 
        let total = 0;
        if (datos && datos.length > 0) {
            total = datos.reduce((sum, producto) => sum + producto.precio, 0);
        }

        console.log("precio total: ", total);
        res.render("carrito", {productos:datos, total:total})

    })

    
    
}, 
    
}