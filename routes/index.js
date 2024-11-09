var express = require('express');
var router = express.Router();
const controllerMain = require('../controller/controllerProduct')

router.get('/',controllerMain.login);
router.post('/',controllerMain.inicio);
router.get('/index', controllerMain.index);
router.post('/index', controllerMain.seleccion);
router.get('/descripcion',controllerMain.descrip);
router.get('/favoritos',controllerMain.verFavoritos);


module.exports = router;
