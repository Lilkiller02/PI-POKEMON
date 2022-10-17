const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeType = require('./routeType')
const routePokemons = require('./routePokemons');
const { creadorDePokemons, getRangeAttack} = require('../controladores/fnPoke');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', routePokemons)
router.use('/types',routeType )
router.post('/pokemons', creadorDePokemons)
//ELIMINAR ESTA RUTA
router.get('/prueba',getRangeAttack)


module.exports = router;
