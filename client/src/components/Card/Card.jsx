import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom';
function Card({id,name,img,types,Types}) {
    let tipos = types && types.map((e, index) => {
        const nameType = e.name ? e.name : e;
        return <p key={index}>{nameType}</p>;
        
      });

    let tiposDB = Types && Types.map((e, index) => {
     const typeName = e.name ? e.name : e;
     return <p key={index}>{typeName}</p>
    })
  return (
    <>
    
    <Link to ={`/pokemons/${id}`}>
      <div className='hay'>
        <h3>{name}</h3>
        <img className ='img'src={img} alt={name} />
        <div className='tipos'>{tipos|| tiposDB}</div>
      </div>
    </Link>
  
    </>
  )
}

export default Card