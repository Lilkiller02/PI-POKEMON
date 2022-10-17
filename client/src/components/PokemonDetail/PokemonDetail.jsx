import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { clearDetail, getDetail } from '../../redux/actions/actions'
import './PokemonDetail.css'
import Loading from '../Loading/Loading'
function PokemonDetail() {
    const{id}=useParams()
    const dispatch = useDispatch()

    
    useEffect(()=>{
        dispatch(getDetail(id))
    },[dispatch,id])

    useEffect(()=>{
        dispatch(clearDetail())
    },[dispatch])
   
    const pokeDetail = useSelector(state=>state.detail[0])
    const{loading} = useSelector(state=>state)
    

  

    if(loading){
        return <Loading/>
    }
    return (
        <>
        {pokeDetail&&(
            <div className='fondo'>
                <Link to='/home'><button className='btn'>Volver</button></Link>
                <div className='detail'>
                <div>
                <h1>{pokeDetail.name}</h1>
                <img className = 'imgpa'src={pokeDetail.img} alt={pokeDetail.name}/>
                </div>

                <div className='padre'>
                    <div className='ultima'>
                    <h3>Attack: {pokeDetail.attack}</h3>
                    <h3>Defense: {pokeDetail.defense}</h3>
                    <h3>Height: {pokeDetail.height}</h3>
                    <h3>HP: {pokeDetail.hp}</h3>
                    </div>
                    <div>
                    <h3>Speed: {pokeDetail.speed}</h3>
                    <h3>Weight: {pokeDetail.weight}</h3>
                    <h3>Types: {pokeDetail.types?.join('  ')||pokeDetail.Types.map(t=>t.name)+' '}</h3>
                    <h3>ID: {pokeDetail.id}</h3>
                    </div>
                </div>
            </div>
            </div>
        
        )}
        </>
  )
}

export default PokemonDetail