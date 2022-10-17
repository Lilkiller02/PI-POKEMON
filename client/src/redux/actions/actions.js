import { GET_DETAIL, GET_POKEMONS, GET_TYPES, SEARCH_POKEMON_BY_NAME,POST_POKEMON,LOADING, FILTER_POKEMON_BY_NAME,FILTER_POKEMON_BY_STRENGTH, FILTER_ORIGINAL_CREATE, FILTER_BY_TYPE, CLEAR_DETAIL} from './actionTypes';
import axios from 'axios';

export function getPoke(){
  return async function(dispatch){
    dispatch({type:LOADING})
    await axios.get('http://localhost:3001/pokemons')
    .then(r=> dispatch({type:GET_POKEMONS, payload:r.data}))
    .catch(err=> console.log(err))
  }
}

export function getType (){
    return async function(dispatch){
      dispatch({type:LOADING})
        await axios.get('http://localhost:3001/types')
        .then(r=>dispatch({type:GET_TYPES, payload:r.data}))
        .catch(err=>console.log(err))
    }
}

export function searchByName(name){
  return async function(dispatch){
    dispatch({type:LOADING})
    try {
      let pokemonsByName= await axios.get(`http://localhost:3001/pokemons?name=${name}`)
      return dispatch({type:SEARCH_POKEMON_BY_NAME,payload:pokemonsByName.data})
      
    } catch (err) {
      console.log(err)
    }
  }
}

export function getDetail (id){
  return async function (dispatch) {
    dispatch({type:LOADING})
    await axios.get(`http://localhost:3001/pokemons/${id}`)
    .then(r=> r.data)
    .then(data=>dispatch({type:GET_DETAIL, payload:data}))
    .catch(err=>console.log(err))
}
}

export function postPokemon(data){
  return async function(dispatch){
    try {
      const pokemonCreado = await axios.post('http://localhost:3001/pokemons/',data)
      return dispatch({type:POST_POKEMON,payload:pokemonCreado.data})
    } catch (error) {
      console.log(error)
    }
  }
}

export function filterPokemonByName(name){
  return{
    type:FILTER_POKEMON_BY_NAME,
    payload:name
  }
}

export function filterPokemonByStrength(fuerza){
  return {
    type:FILTER_POKEMON_BY_STRENGTH,
    payload:fuerza
  }
}

export function filterByCreate (payload){
  return{
    type:FILTER_ORIGINAL_CREATE,
    payload
  }
}

export function filterByType(tipo){
  return{
    type:FILTER_BY_TYPE,
    payload:tipo
  }
}

export function clearDetail (payload){
  return{
    type:CLEAR_DETAIL,
    payload
  }
}