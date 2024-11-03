var express = require('express');
var router = express.Router();
const controllerMain = require('../controller/controllerProduct')

router.get('/',controllerMain.index);
router.post('/', controllerMain.seleccion);
router.get('/descripcion',controllerMain.descrip);

module.exports = router;
