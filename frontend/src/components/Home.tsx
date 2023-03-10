import React from 'react'

const Home = (props: any) => {
  return (
    <div className='page-body'>
      {props.user ? (<div>{`Hello ${props.user.username}`}</div>) : (<div>Hello</div>)}
    </div>
  )
}

export default Home