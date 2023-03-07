import React from 'react'
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <div className='nav'>
      <div className='app-name'>Debt Collector</div>
      <div className='nav-links'>
        <div className='nav-link'>Home</div>
        <div className='nav-link'>Debt</div>
        <div className='nav-link'>Logout</div>
      </div>
    </div>
  )
}

export default Navbar