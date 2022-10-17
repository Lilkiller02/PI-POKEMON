import { GET_DETAIL, GET_POKEMONS,GET_TYPES, SEARCH_POKEMON_BY_NAME,POST_POKEMON, LOADING,FILTER_POKEMON_BY_NAME,FILTER_POKEMON_BY_STRENGTH, FILTER_ORIGINAL_CREATE, FILTER_BY_TYPE, CLEAR_DETAIL} from "../actions/actionTypes"
const initialState = {
    pokemons:[],
    types:[],
    detail:[],
    copyPokes:[],
    loading:false
}


export default function rootReducer(state = initialState, {type,payload}){
    switch(type){
        case GET_POKEMONS:return{
            ...state,
            pokemons:payload,
            copyPokes:payload,
            loading:false
        }
        case GET_TYPES:return{
            ...state,
            types:payload,
            loading:false
        }
        case SEARCH_POKEMON_BY_NAME:return{
            ...state,
            pokemons:payload,
            loading:false
        }
        case GET_DETAIL:return{
            ...state,
            detail:payload,
            loading:false
        }
        case POST_POKEMON:return{
            ...state
        }
        case LOADING:return{
            ...state,
            loading:true
        }
        case FILTER_POKEMON_BY_NAME:
        let sort = state.pokemons
        switch (payload) {
            case 'abc':
                sort = state.pokemons.sort((a, b) => { return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1 })
                break;
            case 'cba':
                sort = state.pokemons.sort((a, b) => { return b.name.toLowerCase() < a.name.toLowerCase() ? -1 : 1 })
                break;
            default: return sort
        }
    
          return{
            ...state,
            pokemons:sort
          }
          case FILTER_POKEMON_BY_STRENGTH: 
            const allPoke = state.pokemons;
            const orderByStrength = payload ==="mas" 
            ? allPoke.sort(function(a,b){
                if (a.attack > b.attack) {
                    return -1;
                  }
                  if (b.attack > a.attack) {
                    return 1;
                  }
            
                  return 0;
            })
            :allPoke.sort(function(a,b){
                if (a.attack > b.attack) {
                    return 1;
                  }
                  if (b.attack > a.attack) {
                    return -1;
                  }
                  
                  return 0;
            })
            return{
                ...state,
                pokemons:orderByStrength
            }
            case FILTER_ORIGINAL_CREATE :
                const pokes = state.copyPokes
                const filterOC = payload === "original"
                ?pokes.filter(p=> typeof p.id === 'number')
                :pokes.filter(p=> typeof p.id === 'string')
                return {
                    ...state,
                    pokemons:filterOC
                }

                
            case FILTER_BY_TYPE:
                const pokeForTypes = state.pokemons; // encontrar solucion
                let tipos= payload
                const filterType = pokeForTypes.filter(p => p.types
                ? p.types.some(t=> t === tipos)
                : p.Types.some(t=> t.name === tipos))

                return{
                    ...state,
                    pokemons:filterType,
                    copyPokes:pokeForTypes
                }

            case CLEAR_DETAIL: return{
                ...state,
                detail:[]
            }
            default: return state
    }
}