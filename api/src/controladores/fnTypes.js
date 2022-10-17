const axios = require('axios');
const {Type} = require('../db')

const tiposPokes = async(req,res)=>{
//Obtener todos los tipos de pokemons posibles
// En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

let types = await Type.findAll()
    try {
        if(types.length){
        res.json(types)
        }else{
            const typesFromAPI = await axios.get('https://pokeapi.co/api/v2/type')
            const types = typesFromAPI.data.results

            types.forEach(t => {
                Type.findOrCreate({
                    where:{
                        name: t.name,
                    }
                })
            });
            
        const typesDB = await Type.findAll()
        res.json(typesDB)
    }
} catch (error) {
    res.send('Tipo de pokemon no existe')
}
}   


            
module.exports ={tiposPokes}