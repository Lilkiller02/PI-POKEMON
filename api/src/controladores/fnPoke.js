const axios = require('axios');

const { Pokemon, Type } = require('../db')

const infoPoke= async (pokemon)=> {
    let obj = {};
    await axios.get(pokemon.url)
        .then(p => {
            obj.id = p.data.id;
            obj.name = p.data.name;
            obj.hp = p.data.stats[0].base_stat;
            obj.attack = p.data.stats[1].base_stat;
            obj.defense = p.data.stats[2].base_stat;
            obj.speed = p.data.stats[5].base_stat;
            obj.height = p.data.height;
            obj.weight = p.data.weight;
            obj.types = p.data.types.length > 1 ? [p.data.types[0].type.name, p.data.types[1].type.name] : [p.data.types[0].type.name];
            obj.img = p.data.sprites.other.dream_world.front_default
        })

    return obj
}

const todosLosPokes = async ()=> {
    try{
        let firstTwenty = await axios.get('https://pokeapi.co/api/v2/pokemon');
        let lastTwenty = await axios.get(firstTwenty.data.next);
        let pokemonsDB = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name']
            }
        })
        let pokemonsAPI = firstTwenty.data.results.concat(lastTwenty.data.results)
        pokemonsAPI = await Promise.all(pokemonsAPI.map(p => infoPoke(p)));
            return (pokemonsAPI).concat(pokemonsDB)
    }
    catch(error){
        console.log(error)
    }
}



const todosOporNombre = async (req,res)=> {
    try {
        let { name } = req.query
        let pokemons = await todosLosPokes();
        if (name) {
            answer = await Promise.all(pokemons.filter(p => p.name.toLowerCase() == name.toLowerCase()))
            res.json(answer)
        } else {
            res.json(pokemons);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

const pokePorId = async (req,res)=>{
    try {
        const{id}= req.params;
        const allPokes = await todosLosPokes()
        let buscado = allPokes.filter(p=> p.id == id)
        res.json(buscado)
    } catch (error) {
        res.send('Id inexistente')
    }

}

const creadorDePokemons = async (req,res)=>{
    const{name,hp,attack,defense,speed,height,weight,types,img}=req.body;
    let allPokes = await todosLosPokes()
    try {
        if(allPokes.filter(pokemon=> pokemon.name.toLowerCase()=== name.toLowerCase()).length){
            res.send(`el pokemon de nombre ${name} ya existe`)
        }else{
            const pokeCreado = await Pokemon.create({name,hp,attack,defense,speed,height,weight,img})
            const tipos = await Type.findAll({
                where:{
                    name:types
                }
            })
            await pokeCreado.addType(tipos)
            res.send(`Pokemon ${name} creado correctamente`)
        }
    } catch (error) {
        console.log(error)
    }
}
//BORRAR DESPUES Y MODIFICAR EL FORCE TRUE 
const getRangeAttack = async(req,res)=>{
    const{min,max} = req.query;
    try {
     const range  = await Pokemon.findAll({
        where:{
            attack:{
                [Op.between]:[min,max]
            }
        }
     })  
     res.json(range) 
    } catch (error) {
        res.status(400).send('te falta pa no te rindas')
    }
}

module.exports ={todosOporNombre,pokePorId,creadorDePokemons,getRangeAttack}




