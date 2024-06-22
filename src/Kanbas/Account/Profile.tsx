// // import * as client from './client'
// // import { useState, useEffect } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import { useDispatch } from 'react-redux'
// // import { setCurrentUser } from './reducer'
// // import { FaSave, FaSignOutAlt } from 'react-icons/fa'

// // export default function Profile () {
// //   const [profile, setProfile] = useState<any>({})
// //   const navigate = useNavigate()
// //   const dispatch = useDispatch()

// //   const fetchProfile = async () => {
// //     try {
// //       const account = await client.profile()
// //       setProfile(account)
// //     } catch (err: any) {
// //       navigate('/Kanbas/Account/Signin')
// //     }
// //   }

// //   const saveProfile = async () => {
// //     try {
// //       await client.updateProfile(profile._id, profile)
// //       alert('Profile saved successfully')
// //     } catch (err: any) {
// //       console.error('Error saving profile:', err)
// //       alert('Error saving profile')
// //     }
// //   }

// //   const signout = async () => {
// //     await client.signout()
// //     dispatch(setCurrentUser(null))
// //     navigate('/Kanbas/Account/Signin')
// //   }

// //   useEffect(() => {
// //     fetchProfile()
// //   }, [])

// //   return (
// //     <div className='container mt-5'>
// //       <h1 className='mb-4'>Profile</h1>
// //       {profile && (
// //         <div className='card p-4 shadow-sm'>
// //           <div className='row mb-3'>
// //             <div className='col-md-6'>
// //               <label className='form-label'>Username</label>
// //               <input
// //                 className='form-control'
// //                 value={profile.username}
// //                 onChange={e =>
// //                   setProfile({ ...profile, username: e.target.value })
// //                 }
// //               />
// //             </div>
// //             <div className='col-md-6'>
// //               <label className='form-label'>Password</label>
// //               <input
// //                 type='password'
// //                 className='form-control'
// //                 value={profile.password}
// //                 onChange={e =>
// //                   setProfile({ ...profile, password: e.target.value })
// //                 }
// //               />
// //             </div>
// //           </div>
// //           <div className='row mb-3'>
// //             <div className='col-md-6'>
// //               <label className='form-label'>First Name</label>
// //               <input
// //                 className='form-control'
// //                 value={profile.firstName}
// //                 onChange={e =>
// //                   setProfile({ ...profile, firstName: e.target.value })
// //                 }
// //               />
// //             </div>
// //             <div className='col-md-6'>
// //               <label className='form-label'>Last Name</label>
// //               <input
// //                 className='form-control'
// //                 value={profile.lastName}
// //                 onChange={e =>
// //                   setProfile({ ...profile, lastName: e.target.value })
// //                 }
// //               />
// //             </div>
// //           </div>
// //           <div className='row mb-3'>
// //             <div className='col-md-6'>
// //               <label className='form-label'>Date of Birth</label>
// //               <input
// //                 type='date'
// //                 className='form-control'
// //                 value={profile.dob}
// //                 onChange={e => setProfile({ ...profile, dob: e.target.value })}
// //               />
// //             </div>
// //             <div className='col-md-6'>
// //               <label className='form-label'>Email</label>
// //               <input
// //                 type='email'
// //                 className='form-control'
// //                 value={profile.email}
// //                 onChange={e =>
// //                   setProfile({ ...profile, email: e.target.value })
// //                 }
// //               />
// //             </div>
// //           </div>
// //           <div className='mb-4'>
// //             <label className='form-label'>Role</label>
// //             <select
// //               className='form-select'
// //               value={profile.role}
// //               onChange={e => setProfile({ ...profile, role: e.target.value })}
// //             >
// //               <option value='USER'>User</option>
// //               <option value='ADMIN'>Admin</option>
// //               <option value='FACULTY'>Faculty</option>
// //               <option value='STUDENT'>Student</option>
// //             </select>
// //           </div>
// //           <div className='d-flex justify-content-between'>
// //             <button
// //               onClick={saveProfile}
// //               className='btn btn-primary w-48 d-flex align-items-center'
// //             >
// //               <FaSave className='me-2' /> Save
// //             </button>
// //             <button
// //               onClick={signout}
// //               className='btn btn-danger w-48 d-flex align-items-center'
// //             >
// //               <FaSignOutAlt className='me-2' /> Sign out
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }
// import * as client from './client'
// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { setCurrentUser } from './reducer'
// import { FaSave, FaSignOutAlt } from 'react-icons/fa'

// export default function Profile () {
//   const [profile, setProfile] = useState<any>({})
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const fetchProfile = async () => {
//     try {
//       const account = await client.profile()
//       setProfile(account)
//     } catch (err: any) {
//       navigate('/Kanbas/Account/Signin')
//     }
//   }

//   const saveProfile = async () => {
//     try {
//       await client.updateProfile(profile._id, profile)
//       alert('Profile saved successfully')
//     } catch (err: any) {
//       console.error('Error saving profile:', err)
//       alert('Error saving profile')
//     }
//   }

//   const signout = async () => {
//     await client.signout()
//     dispatch(setCurrentUser(null))
//     navigate('/Kanbas/Account/Signin')
//   }

//   useEffect(() => {
//     fetchProfile()
//   }, [])

//   return (
//     <div className='container mt-5'>
//       <h1 className='mb-4'>Profile</h1>
//       {profile && (
//         <div className='card p-4'>
//           <div className='mb-3'>
//             <label className='form-label'>Username</label>
//             <input
//               className='form-control'
//               value={profile.username}
//               onChange={e =>
//                 setProfile({ ...profile, username: e.target.value })
//               }
//             />
//           </div>
//           <div className='mb-3'>
//             <label className='form-label'>Password</label>
//             <input
//               className='form-control'
//               value={profile.password}
//               onChange={e =>
//                 setProfile({ ...profile, password: e.target.value })
//               }
//             />
//           </div>
//           <div className='mb-3'>
//             <label className='form-label'>First Name</label>
//             <input
//               className='form-control'
//               value={profile.firstName}
//               onChange={e =>
//                 setProfile({ ...profile, firstName: e.target.value })
//               }
//             />
//           </div>
//           <div className='mb-3'>
//             <label className='form-label'>Last Name</label>
//             <input
//               className='form-control'
//               value={profile.lastName}
//               onChange={e =>
//                 setProfile({ ...profile, lastName: e.target.value })
//               }
//             />
//           </div>
//           <div className='mb-3'>
//             <label className='form-label'>Date of Birth</label>
//             <input
//               className='form-control'
//               value={profile.dob}
//               onChange={e => setProfile({ ...profile, dob: e.target.value })}
//               type='date'
//             />
//           </div>
//           <div className='mb-3'>
//             <label className='form-label'>Email</label>
//             <input
//               className='form-control'
//               value={profile.email}
//               onChange={e => setProfile({ ...profile, email: e.target.value })}
//             />
//           </div>
//           <div className='mb-4'>
//             <label className='form-label'>Role</label>
//             <select
//               className='form-select'
//               value={profile.role}
//               onChange={e => setProfile({ ...profile, role: e.target.value })}
//             >
//               <option value='USER'>User</option>
//               <option value='ADMIN'>Admin</option>
//               <option value='FACULTY'>Faculty</option>
//               <option value='STUDENT'>Student</option>
//             </select>
//           </div>
//           <button onClick={saveProfile} className='btn btn-primary w-100 mb-3'>
//             <FaSave className='me-2' /> Save
//           </button>
//           <button onClick={signout} className='btn btn-danger w-100'>
//             <FaSignOutAlt className='me-2' /> Sign out
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }
import * as client from './client'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from './reducer'
import { FaSave, FaSignOutAlt } from 'react-icons/fa'
 
export default function Profile () {
  const [profile, setProfile] = useState<any>({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  const fetchProfile = async () => {
    try {
      const account = await client.profile()
      setProfile(account)
      dispatch(setCurrentUser(account))
    } catch (err: any) {
      navigate('/Kanbas/Account/Signin')
    }
  }
 
  const saveProfile = async () => {
    try {
      await client.updateProfile(profile._id, profile)
      alert('Profile saved successfully')
    } catch (err: any) {
      console.error('Error saving profile:', err)
      alert('Error saving profile')
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
          <button onClick={saveProfile} className='btn btn-primary w-100 mb-3'>
            <FaSave className='me-2' /> Save
          </button>
          <button onClick={signout} className='btn btn-danger w-100'>
            <FaSignOutAlt className='me-2' /> Sign out
          </button>
        </div>
      )}
    </div>
  )
}
 
