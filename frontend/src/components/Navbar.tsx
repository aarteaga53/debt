import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = ({setIsSignedIn}: {setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>}) => {
  let locate = useLocation()

  /**
     * checks if path given is currently selected
     * 
     * @param {*} path 
     * @returns a class name for the currently selected path
     */
  let isCurrent = (path: string): string => {
    return locate.pathname.includes(path) ? 'current nav-link' : 'nav-link'
  }

  let logout = (): void => {
    window.localStorage.removeItem('token')
    setIsSignedIn(false)
  }

  return (
    <div className='nav'>
      <div className='app-name'>Debt Collector</div>
      {locate.pathname.includes('auth') || locate.pathname === '/' ? null : 
        (<div className='nav-links'>
          <Link to='/home' className={isCurrent('home')}>Home</Link>
          <Link to='/finance' className={isCurrent('finance')}>Finance</Link>
          <Link to='/' className='nav-link' onClick={logout}>Logout</Link>
        </div>)}
      {locate.pathname === '/' ? 
      (<div className='auth-links'>
        <Link to='/auth' className='current nav-link'>Sign In</Link>
      </div>) : null}
    </div>
  )
}

export default Navbar