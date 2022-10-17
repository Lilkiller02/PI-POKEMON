import React from 'react'
import { Link,useHistory } from 'react-router-dom'
import { postPokemon, getPoke, getType } from '../../redux/actions/actions';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './PokemosCreate.css'
export const PokemonCreate = () => {
  const dispatch = useDispatch()
  const {types} = useSelector(state=>state)
  
  useEffect(()=>{
    dispatch(getPoke())
    dispatch(getType())
  },[dispatch])
  
  
  const [form,setFrom]=useState({
    name:'',
    hp:'',
    attack:'',
    defense:'',
    speed:'',
    height: '',
    weight: '',
    types:[],
    img:''
  })

  const [errors,setErrors] = useState({})


  const history=useHistory()

  
  function handleOnChange(e){
    setFrom({
      ...form,
      [e.target.name]:e.target.value
    })
    setErrors(validate({
      ...form,
      [e.target.name]: e.target.value
    }))
  }


  function handleOnChangeSelect(e){
    setFrom({
      ...form,
      types:[...form.types, e.target.value]
    })
  }

  function handleOnClickDelete(t,e){
    e.preventDefault()
    setFrom({
      ...form,
      types: form.types.filter((type)=>type !== t)
    })
  }

  async function handleOnSubmit(e){
    e.preventDefault();
    if(Object.keys(errors).length === 0){
      await dispatch (postPokemon(form));
      setFrom({
      name:'',
      hp:'',
      attack:'',
      defense:'',
      speed:'',
      height: '',
      weight: '',
      types:[],
      img:''
    });

    history.push('./home')
    }
    
  }
// Prueba validaciones

  function validate(form){
    let errors = {}
    if(!form.name){
      errors.name = 'Se requiere nombre'

    }else if (!/\S{1,15}[^0-9]/.test(form.name)){
      errors.name = 'Nombre invalido';
     
    }
    if(form.hp <=0 || form.hp >90){
      errors.hp = 'La vida puede ser de 1-90'
    }
    if(form.attack <=0|| form.attack >255){
      errors.attack = 'el ataque puede ser de 1-255'
    }
    if(form.defense <=0 || form.defense >255){
      errors.defense = 'la defensa puede ser de 1-255'
    }
    if(form.speed <=0 || form.speed >255){
      errors.speed = 'la velocidad puede ser de 1-255'
    }
    if(form.height <=0 || form.height >255){
      errors.height = 'la altura puede ser de 1-255'
    }
    if(form.weight <=0 || form.weight > 255){
      errors.weight = 'el peso puede ser de 1-255'
    }
    
    return errors
  }


  return (
    <div>
        <div>
        <Link to ='home'><button className='btn'>volver</button></Link>
        </div>
        <div>
          <h1 className='crear'>CREA TU POKEMON</h1>
          
        </div>
        <div>
        <div>
          <form onSubmit={e=>handleOnSubmit(e)}>
              {/* <div>
                <button className='btn' type='submit'>Crear Pokemon</button>
              </div> */}
            <div className='orden'>
            <div className='formulario'>
            <label>Nombre: <input 
            type="text" 
            name="name"
            placeholder='Nombre'
            value={form.name}
            onChange={e=>handleOnChange(e)}
            /> </label>
            {errors.name &&(<p className='danger'>{errors.name}</p>)}

            <label>Hp: <input 
            type="text" 
            name="hp"
            placeholder='1-90'
            value={form.hp}
            onChange={e=>handleOnChange(e)}
            /> </label>
           {errors.hp&&(<p className='danger'>{errors.hp}</p>)}
          
            <label>Attack: <input 
            type="text" 
            name="attack"
            placeholder='1-255'
            value={form.attack}
            onChange={e=>handleOnChange(e)}
            /> </label>
            {errors.attack&& <p className='danger'>{errors.attack}</p>}

            <label>Defense: <input 
            type="text" 
            name="defense"
            placeholder='1-255'
            value={form.defense}
            onChange={e=>handleOnChange(e)}
            /> </label>
            {errors.defense&& <p className='danger'>{errors.defense}</p>}
            
            <label>Speed: <input 
            type="text" 
            name="speed"
            placeholder='1-255'
            value={form.speed}
            onChange={e=>handleOnChange(e)}
            /> </label>
            {errors.speed&& <p className='danger'>{errors.speed}</p>}
           
            <label>Height: <input 
            type="text" 
            name="height"
            placeholder='1-255'
            value={form.height}
            onChange={e=>handleOnChange(e)}
            /> </label>
            {errors.height && <p className='danger'>{errors.height}</p>}
           
            <label>Weight: <input 
            type="text" 
            name="weight"
            placeholder='1-255'
            value={form.weight}
            onChange={e=>handleOnChange(e)}
            /> </label>
            {errors.weight&& <p className='danger'>{errors.weight}</p>}
          
            <label>Image: <input 
            type="url"
            name="img"
            placeholder='URL'
            value={form.img}
            onChange={e=>handleOnChange(e)}
            /> </label>

             
             <label>Types: <select onChange={e=> handleOnChangeSelect(e)}>
                {types.map((t, i)=>(
                  <option key={i} value={t.name}>{t.name}</option>
                ))}
              </select>
              </label>

              <div className='prueba3'>
                {form.types.map((t,i)=>(
                  <ul className='prueba2' key={i}>
                    <ul key={i}>{t}</ul>
                    <button className='btn2'onClick={e=>handleOnClickDelete(t,e)}>X</button>
                  </ul>  
                ))}
                
            </div>
            </div>
            </div>
            <div>
                <button className='btn' type='submit'>Crear Pokemon</button>
              </div>
          </form>
        </div>
        </div>
    </div>
  )
}


