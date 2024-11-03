//CONEXIÓN A NUESTRA BD
/*EL MODELO NOS PERMITE ACCEDER A LA INFORMACION DE LA BASE DE DATOS, ES DECIR TRABAJAR CON SENTENCIAS PARA
INTERACTUAR CON LOS REGISTROS*/

module.exports = {
    obtener:function(conexion, funcion){
        conexion.query("SELECT idproductos,nombre, imagen,precio FROM productos", funcion);
    },

    descripcionn:function(conexion, id, funcion){
        conexion.query("SELECT idproductos, nombre, departamento, precio, imagen, descripcion FROM productos where idproductos=?",[id.idproductos],funcion);
    }

}
