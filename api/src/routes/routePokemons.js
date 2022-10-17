const { Router } = require('express');
const {todosOporNombre,pokePorId} = require ('../controladores/fnPoke')

const router = Router();

router.get('/',todosOporNombre)
router.get('/:id',pokePorId)

module.exports = router;