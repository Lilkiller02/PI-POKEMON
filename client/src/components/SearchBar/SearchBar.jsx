import React from 'react'
import { useDispatch} from 'react-redux'
import {useState} from 'react'
import { searchByName } from '../../redux/actions/actions'
function SearchBar() {
const dispatch = useDispatch()
const [name,setName] = useState('')

function handleOnChange(e){
  e.preventDefault()
  setName(e.target.value)
}
function handleOnClick(e){
  e.preventDefault()
    dispatch(searchByName(name))
    setName('')
}

  return (
    <div>
        <input className='ipt' type='text' placeholder='Ingresar nombre de Pokemon...' value={name} onChange={e=>handleOnChange(e)}/>
        <button className='btn' type='submit' onClick={e=>handleOnClick(e)}>Buscar</button>
    </div>
  )
}

export default SearchBar