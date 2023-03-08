import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Auth.css'

const Auth = (props: any) => {
  let [isSignup, setIsSignup] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {
    let removeToken = () => {
        window.localStorage.removeItem('token')
        props.setToken(null)
        props.setUser(null)
    }

    removeToken()
}, [props])

  /**
     * allows the user to signin
     */
  let signin = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget);
    const user = {email: form.get('email'), password: form.get('password')}
    
    let response = await fetch(`http://127.0.0.1:8000/verify`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    let data = await response.json()

    if(data.msg !== 'error') {
        navigateHome(data)
    }
}

/**
 * allows the user to register
 */
let signup = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget);
    const newUser = {
        first: form.get('first'), 
        last: form.get('last'), 
        email: form.get('email'), 
        password: form.get('password')
    }

    let response = await fetch(`http://127.0.0.1:8000/register`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })

    let data = await response.json()

    if('insertedId' in data) {
        setIsSignup(false)
    }
  }

  /**
     * changes between signin and signup inputs
     */
  let toggleAuth = () => {
    setIsSignup(!isSignup)
  }

  let navigateHome = async (token: Object) => {
    let response = await fetch(`http://127.0.0.1:8000/user`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ token: token })
    })

    let data = await response.json()
    props.setUser(data)
    window.localStorage.setItem('token', JSON.stringify(token))
    props.setToken(token)
    navigate('/home')
  }

  return (
    <div className='auth-body'>
      <div className='auth-box'>
        <div className='auth-welcome'>
          <div className='welcome-title'>Welcome to Debt Collector</div>
          <ul>
            <li>Keep track of debts</li>
            <li>Split expenses</li>
          </ul>
        </div>
        <form className='auth-form' onSubmit={isSignup ? signup : signin}>
          <div className='auth-title'>{isSignup ? 'Sign Up' : 'Sign In'}</div>
          <div className='auth-inputs'>
            {isSignup ? (<>
              <TextField id='first' name='first' label='First Name' type='text' margin='normal' required />
              <TextField id='last' name='last' label='Last Name' type='text' margin='normal' required />
            </>) : null}
            <TextField id='email' name='email' label='Email' type='email' margin='normal' required />
            <TextField id='password' name='password' label='Password' type='password' margin='normal' required />
          </div>
          <div className='auth-buttons'>
            <Button variant='outlined' type='button' onClick={toggleAuth}>{isSignup ? 'Sign In' : 'Sign Up'}</Button>
            <Button variant='outlined' type='submit' >{isSignup ? 'Sign Up' : 'Sign In'}</Button>
          </div>
        </form>
      </div>
      <div className='wave'>
        <svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
          <path d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z' className='shape-fill'></path>
        </svg>
      </div>
    </div>
  )
}

export default Auth