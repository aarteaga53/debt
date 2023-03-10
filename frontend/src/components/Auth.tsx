import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
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
        <form className='auth-form' onSubmit={isSignup ? signup : signin}>
          <div className='auth-title'>{isSignup ? 'Sign Up' : 'Sign In'}</div>
          <div className='auth-inputs'>
            {isSignup ? (<>
              <TextField variant='standard' id='first' name='first' label='First Name' type='text' margin='normal' required />
              <TextField variant='standard' id='last' name='last' label='Last Name' type='text' margin='normal' required />
            </>) : null}
            <TextField variant='standard' id='email' name='email' label='Email' type='email' margin='normal' required />
            <TextField variant='standard' id='password' name='password' label='Password' type='password' margin='normal' required />
          </div>
          <div className='auth-options'>
            <FormGroup>
              {isSignup ? (
                <FormControlLabel control={<Checkbox size='small' required />} label="I agree to the terms & conditions." />
              ) : (
                <FormControlLabel control={<Checkbox size='small' />} label="Remember me" />
              )}
            </FormGroup>
            {isSignup ? null : (<div className='forgot'>Forgot Password?</div>)}
          </div>
          <Button variant='contained' type='submit' fullWidth>{isSignup ? 'Sign Up' : 'Sign In'}</Button>
          {isSignup ? (
            <div className='register'>
              <div>Already have an account?</div>
              <div className='register-option' onClick={toggleAuth}>Sign In</div>
            </div>
          ) : (
            <div className='register'>
              <div>Don't have an account?</div>
              <div className='register-option' onClick={toggleAuth}>Register</div>
            </div>
          )}
        </form>
      </div>
      <div className='wave'>
        <svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
          <path d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z' className='shape-fill'></path>
        </svg>
      </div>
      <div className="wave-opacity">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
        </svg>
      </div>
    </div>
  )
}

export default Auth