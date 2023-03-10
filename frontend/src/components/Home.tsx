import React from 'react'

interface User {
  _id?: string,
  username?: string,
  email?: string,
  password?: string,
  iat?: number
}

const Home = ({ user }: { user: User}) => {
  return (
    <div className='page-body'>
      {user ? (<div>{`Hello ${user.username}`}</div>) : (<div>Hello</div>)}
    </div>
  )
}

export default Home