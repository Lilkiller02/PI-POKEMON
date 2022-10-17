import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect,useState } from 'react'
import { getPoke,getType,filterPokemonByName, filterPokemonByStrength, filterByCreate, filterByType} from '../../redux/actions/actions'
import Card from '../Card/Card'
import SearchBar from '../SearchBar/SearchBar'
import './home.css'
import Loading from'../Loading/Loading'
import Paginado from '../Paginado/Paginado'


function Home () {
  
  const dispatch= useDispatch()
  
  useEffect(()=>{
    dispatch(getPoke())
    dispatch(getType())
  },[dispatch])
  
  const {pokemons,loading,types} = useSelector((state)=>state)


  const[actualPage,setActualPage]= useState(1)
  const [pokePage]= useState(12)
  const lastPoke = actualPage*pokePage;
  const firstPoke = lastPoke - pokePage;
  const actualPoke = pokemons.slice(firstPoke,lastPoke)
  
  const paginacion = (pageNumber)=>{
    setActualPage(pageNumber)
  }
  
  


  function handleOnChangeName(e){
    if(e.target.value !== "all"){
    dispatch(filterPokemonByName(e.target.value))
    }
  }


  function handleOnChangeStrength(e){
    if(e.target.value !== "all"){
    dispatch(filterPokemonByStrength(e.target.value))
    }
  }

  function handleOnChangeCreate(e){
    if(e.target.value !== 'all'){
      dispatch(filterByCreate(e.target.value))
    }
    if(e.target.value === 'all'){
      dispatch(getPoke())
    }
    setActualPage(1)
  }

  function handleOnChangeType(e){
    if(e.target.value !=="all"){
      dispatch(filterByType(e.target.value))
    }
    if(e.target.value === "all"){
      dispatch(getPoke())
    }
  }

  function handleOnClickReset(e){
    dispatch(getPoke())
  }

  if(loading){
    return <Loading/>
  }


  return (
    <div>
      <SearchBar/>
     <label className='filtros'>Ordenar por nombre</label>
      <select className="select" onChange={e=>handleOnChangeName(e)}>
        
        <option value="abc">A-Z</option>
        <option value="cba">Z-A</option>
      </select>
      <label className='filtros'>Ordenar por fuerza</label>
      <select className="select" onChange={e=>handleOnChangeStrength(e)}>
        
        <option value="mas">+Fuerza</option>
        <option value="menos">-Fuerza</option>
      </select>
   
    <label className='filtros'>Filtrar por orginales o creados</label>
     <select  className="select" onChange={e=>handleOnChangeCreate(e)}>
      
      <option value="original">original</option>
      <option value="creado">creado</option>
     </select>

      <label className='filtros'>Filtrar por tipos</label>
      <select className="select" onChange={e=>handleOnChangeType(e)}>
        <option value="all">---</option>
        {types.length&&
          types.map(t=>(
            <option key={t.id} value={t.name}>{t.name}</option>
          ))}
      </select>  

      <button onClick={e=>handleOnClickReset(e)}>reset</button>
        
        <Paginado
        pokePage={pokePage}
        allPoke ={pokemons.length}
        paginado ={paginacion}
        />


      <div className='cards'>
        {actualPoke?.map(p=>{
          return(
            <Card
             key={p.id}
             id={p.id}
             name={p.name}
             img={p.img}
             types={p.types} 
             Types={p.Types}
            />
          )})}

        </div>
    </div>
  )
}

export default Home 