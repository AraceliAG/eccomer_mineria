var express = require('express');
var router = express.Router();
const controllerMain = require('../controller/controllerProduct')

router.get('/',controllerMain.index);

module.exports = router;
