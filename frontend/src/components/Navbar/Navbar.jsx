import React from 'react';
import "./Navbar.css";
const elementlogo = "/Images/3elementlogo.png"

const Navbar = () => {
  return (
    <div className='Home-headerNav'>
      <div className="header-img">
        <img src={elementlogo} alt="logo" className='elementlogo'/>
        <div className="genderCategory">
            <p>MEN</p>
            <p>WOMEN</p>
            <p>KIDS</p>
        </div>
      </div>
      <div className="header-right">
        <input type="search" name="" id="Header-search" />
        <p>TRACK ORDER</p>
        <p>CONTACT US</p>
      </div>
    </div>
  )
}

export default Navbar;