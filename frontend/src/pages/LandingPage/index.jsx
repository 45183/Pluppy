import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
      <div className='my-60'>
        <Link to='/shop'>스토어</Link>
      </div>
      <div className='my-60'>
        <Link to='/community'>커뮤니티</Link>
      </div>
    </div>
  )
}

export default LandingPage