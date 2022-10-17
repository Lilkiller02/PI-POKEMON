import React from 'react'
import uno from './gif.gif'
import './Loading.css'
// import dos from './segundaOpcion.gif'
// import cuatro from './cuatro.gif'
// import tres from './tres.gif'
export default function Loading() {
    return (
        <img className='loading' src={uno} alt="gif" />
    )
}