//CONEXIÓN A NUESTRA BD
/*EL MODELO NOS PERMITE ACCEDER A LA INFORMACION DE LA BASE DE DATOS, ES DECIR TRABAJAR CON SENTENCIAS PARA
INTERACTUAR CON LOS REGISTROS*/

module.exports = {
    //INICIO DE SESION

    inicioSesion:function(conexion, correo, contrasenia, funcion){

        conexion.query("Select * from usuario where correo=? and contrasenia=?",[correo.correo,contrasenia.contrasenia], funcion );

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







}
