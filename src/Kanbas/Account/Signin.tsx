import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from './reducer'

import { Link, useNavigate } from 'react-router-dom'
import * as client from './client'

export default function Signin () {
  const [error, setError] = useState('')

  const [credentials, setCredentials] = useState<any>({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const signin = async () => {
    try {
      const currentUser = await client.signin(credentials)
      dispatch(setCurrentUser(currentUser))
      navigate('/Kanbas/Account/Profile')
    } catch (err: any) {
      setError(err.response.data.message)
    }
  }

  return (
    <div className='container mt-5'>
      <h1 className='mb-4'>Sign In</h1>
      {error && <div className='alert alert-danger'>{error}</div>}

      <div className='card p-4'>
        <div className='mb-3'>
          <label className='form-label'>Username</label>
          <input
            onChange={e =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            value={credentials.username}
            className='form-control'
            placeholder='Username'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input
            onChange={e =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            value={credentials.password}
            className='form-control'
            placeholder='Password'
            type='password'
          />
        </div>
        <button onClick={signin} className='btn btn-primary w-100'>
          Sign In
        </button>
        <div className='mt-3'>
          <Link to='/Kanbas/Account/Signup'>Sign Up</Link>
        </div>
      </div>
    </div>
  )
}
