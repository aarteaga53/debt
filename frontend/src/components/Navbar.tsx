import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css'

const Navbar = () => {
  let locate = useLocation()

  return (
    <div className='nav'>
      <div className='app-name'>Debt Collector</div>
      {locate.pathname.includes('auth') ? null : 
        (<div className='nav-links'>
          <Link to='/home' className='nav-link'>Home</Link>
          <Link to='/debt' className='nav-link'>Debt</Link>
          <Link to='/' className='nav-link'>Logout</Link>
        </div>)
      }
    </div>
  )
}

export default Navbar