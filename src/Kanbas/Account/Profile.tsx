import * as client from './client'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from './reducer'

export default function Profile () {
  const [profile, setProfile] = useState<any>({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchProfile = async () => {
    try {
      const account = await client.profile()
      setProfile(account)
    } catch (err: any) {
      navigate('/Kanbas/Account/Signin')
    }
  }

  const signout = async () => {
    await client.signout()
    dispatch(setCurrentUser(null))
    navigate('/Kanbas/Account/Signin')
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <div className='container mt-5'>
      <h1 className='mb-4'>Profile</h1>
      {profile && (
        <div className='card p-4'>
          <div className='mb-3'>
            <label className='form-label'>Username</label>
            <input
              className='form-control'
              value={profile.username}
              onChange={e =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input
              className='form-control'
              value={profile.password}
              onChange={e =>
                setProfile({ ...profile, password: e.target.value })
              }
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>First Name</label>
            <input
              className='form-control'
              value={profile.firstName}
              onChange={e =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Last Name</label>
            <input
              className='form-control'
              value={profile.lastName}
              onChange={e =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Date of Birth</label>
            <input
              className='form-control'
              value={profile.dob}
              onChange={e => setProfile({ ...profile, dob: e.target.value })}
              type='date'
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input
              className='form-control'
              value={profile.email}
              onChange={e => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          <div className='mb-4'>
            <label className='form-label'>Role</label>
            <select
              className='form-select'
              value={profile.role}
              onChange={e => setProfile({ ...profile, role: e.target.value })}
            >
              <option value='USER'>User</option>
              <option value='ADMIN'>Admin</option>
              <option value='FACULTY'>Faculty</option>
              <option value='STUDENT'>Student</option>
            </select>
          </div>
          <button onClick={signout} className='btn btn-danger w-100'>
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
