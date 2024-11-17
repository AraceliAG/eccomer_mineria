//CONEXIÓN A NUESTRA BD
/* EL MODELO NOS PERMITE ACCEDER A LA INFORMACION DE LA BASE DE DATOS, ES DECIR TRABAJAR CON SENTENCIAS PARA
INTERACTUAR CON LOS REGISTROS*/

module.exports = {

    //-INICIO DE SESION
    inicioSesion:function(conexion, correo, contrasenia, funcion){
        conexion.query("select id_usuario, nombre from usuario where correo=? and contrasenia=?",[correo,contrasenia], funcion );
    },

    // -----------------------------------------------------------------------------------------------------------------
    // - APARTADO PARA MOSTRAR LOS ARTICULOS EN EL INICIO 
      //*alimento
    obtener:function(conexion, funcion){
        conexion.query("SELECT id_productos,nombre, imagen,precio FROM productos WHERE categoria='Higiene Personal'", funcion);
    },
      //*alimento
    obtener2:function(conexion, funcion){
        conexion.query("SELECT id_productos,nombre, imagen,precio FROM productos WHERE categoria='Videojuegos'", funcion);
    },
    //*VETERINARIA
    veterinaria:function(conexion, funcion){
        conexion.query("SELECT id_productos, nombre, categoria, precio, imagen, descripcion FROM productos where categoria='veterinaria'", funcion);
    },
 //*salud
    salud:function(conexion, funcion){
        conexion.query("SELECT id_productos, nombre, categoria, precio, imagen, descripcion FROM productos where categoria='salud'", funcion);
    },
 //*alimento
 alimento:function(conexion, funcion){
    conexion.query("SELECT id_productos, nombre, categoria, precio, imagen, descripcion FROM productos where categoria='alimentos'", funcion);
},

// -----------------------------------------------------------------------------------------------------------------

//-AQUI AL MOMENTO DE SELECCIONAR UN PRODUCTO CREA LA CONSULTA PARA MOSTRAR DETALLES DEL PRODUCTO
descripcionn:function(conexion, id, funcion){
    conexion.query("SELECT id_productos, nombre, categoria, precio, imagen, descripcion FROM productos where id_productos=?",[id.id_productos],funcion);
},

// -----------------------------------------------------------------------------------------------------------------

//-VER FAVORITOS DEL USUARIO

verFav:function(conexion, id_usuario, funcion){

    conexion.query("select p.nombre, p.imagen from favoritos as f join usuario as u on u.id_usuario = f.id_usuario join productos as p on p.id_productos = f.id_productos where u.id_usuario=?",[id_usuario],funcion)
},

//-- AGREGAR FAVORITOS
agregar_fav:function(conexion, id_usuario, id_productos){
    conexion.query("insert into favoritos (id_usuario, id_productos) values(?,?)",[id_usuario,id_productos])

}
// -----------------------------------------------------------------------------------------------------------------

// -VER MI CARRITO PARA CONFIRMACION DE COMPRAS






}
