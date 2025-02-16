//CONEXIÓN A NUESTRA BD
/*EL MODELO NOS PERMITE ACCEDER A LA INFORMACION DE LA BASE DE DATOS, ES DECIR TRABAJAR CON SENTENCIAS PARA
INTERACTUAR CON LOS REGISTROS*/

module.exports = {
    //INICIO DE SESION

    inicioSesion:function(conexion, correo, contrasenia, funcion){

        conexion.query("select id_usuario, nombre from usuario where correo=? and contrasenia=?",[correo,contrasenia], funcion );

    },



    obtener:function(conexion, funcion){
        conexion.query("SELECT id_productos,nombre, imagen,precio FROM productos WHERE categoria='Higiene Personal'", funcion);
    },

    obtener2:function(conexion, funcion){
        conexion.query("SELECT id_productos,nombre, imagen,precio FROM productos WHERE categoria='Videojuegos'", funcion);
    },

    descripcionn:function(conexion, id, funcion){
        conexion.query("SELECT id_productos, nombre, categoria, precio, imagen, descripcion FROM productos where id_productos=?",[id.id_productos],funcion);
    },
    

    //VETERINARIA
    veterinaria:function(conexion, funcion){
        conexion.query("SELECT id_productos, nombre, categoria, precio, imagen, descripcion FROM productos where categoria='veterinaria'", funcion);
    },
 //salud
    salud:function(conexion, funcion){
        conexion.query("SELECT id_productos, nombre, categoria, precio, imagen, descripcion FROM productos where categoria='salud'", funcion);
    },
 //alimento
 alimento:function(conexion, funcion){
    conexion.query("SELECT id_productos, nombre, categoria, precio, imagen, descripcion FROM productos where categoria='alimentos'", funcion);
},



// ------------------------------------------------
//VER FAVORITOS DEL USUARIO

verFav:function(conexion, id_usuario, funcion){

    conexion.query("select p.nombre, p.imagen from favoritos as f join usuario as u on u.id_usuario = f.id_usuario join productos as p on p.id_productos = f.id_productos where u.id_usuario=?",[id_usuario],funcion)
}

// -----------------------------------------------
// -- VER MI CARRITO PARA CONFIRMACION DE COMPRAS






}
