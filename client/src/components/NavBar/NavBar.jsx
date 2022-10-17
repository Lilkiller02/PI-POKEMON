import React from 'react'
import {Link} from 'react-router-dom'
import img from './homePI.png'
import './NavBar.css'
function NavBar() {
  return (
    <div className='navbar'> 
      <Link to ='/'><img className = 'img'src={img} alt='soy la vuelta al home' /></Link>
      <div>
        <Link to ='create'><button className='btn'>Create Pokemon</button></Link>
      </div>
      
    </div>
  )
}

export default NavBar