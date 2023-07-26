import React from 'react'
import './banner.css';
import Navbar from '../../pages/Navbar/Navbar';

const Banner = () => {
  return (
    <>
        <div className='banner-container'>
           <Navbar />
           <div className='text-box'>
                <h1>ShopLuxe</h1>
                <h3>Experience the future of online shopping today.</h3>
           </div>
        </div>
    </>
  )
}

export default Banner