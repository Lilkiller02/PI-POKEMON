const { Router } = require('express');
const { tiposPokes } = require('../controladores/fnTypes');



const router = Router();

router.get('', tiposPokes);

module.exports = router;


