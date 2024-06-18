import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as client from './client'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from './reducer'

export default function Signup () {
  const [error, setError] = useState('')

  const [user, setUser] = useState<any>({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signup = async () => {
    try {
      const currentUser = await client.signup(user)
      dispatch(setCurrentUser(currentUser))
      navigate('/Kanbas/Account/Profile')
    } catch (err: any) {
      setError(err.response.data.message)
    }
  }

  return (
    <div className='container mt-5'>
      <h1 className='mb-4'>Sign Up</h1>
      {error && <div className='alert alert-danger'>{error}</div>}

      <div className='card p-4'>
        <div className='mb-3'>
          <label className='form-label'>Username</label>
          <input
            value={user.username}
            onChange={e => setUser({ ...user, username: e.target.value })}
            className='form-control'
            placeholder='Username'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
            type='password'
            className='form-control'
            placeholder='Password'
          />
        </div>
        <button onClick={signup} className='btn btn-primary w-100 mb-3'>
          Sign Up
        </button>
        <div className='mt-3'>
          <Link to='/Kanbas/Account/Signin'>Sign In</Link>
        </div>
      </div>
    </div>
  )
}
