// // import { useState } from 'react'
// // import { useDispatch } from 'react-redux'
// // import { setCurrentUser } from './reducer'

// // import { Link, useNavigate } from 'react-router-dom'
// // import * as client from './client'

// // export default function Signin () {
// //   const [error, setError] = useState('')

// //   const [credentials, setCredentials] = useState<any>({})
// //   const navigate = useNavigate()
// //   const dispatch = useDispatch()
// //   const signin = async () => {
// //     try {
// //       const currentUser = await client.signin(credentials)
// //       dispatch(setCurrentUser(currentUser))
// //       navigate('/Kanbas/Account/Profile')
// //     } catch (err: any) {
// //       setError(err.response.data.message)
// //     }
// //   }

// //   return (
// //     <div className='container mt-5'>
// //       <h1 className='mb-4'>Sign In</h1>
// //       {error && <div className='alert alert-danger'>{error}</div>}

// //       <div className='card p-4'>
// //         <div className='mb-3'>
// //           <label className='form-label'>Username</label>
// //           <input
// //             onChange={e =>
// //               setCredentials({ ...credentials, username: e.target.value })
// //             }
// //             value={credentials.username}
// //             className='form-control'
// //             placeholder='Username'
// //           />
// //         </div>
// //         <div className='mb-3'>
// //           <label className='form-label'>Password</label>
// //           <input
// //             onChange={e =>
// //               setCredentials({ ...credentials, password: e.target.value })
// //             }
// //             value={credentials.password}
// //             className='form-control'
// //             placeholder='Password'
// //             type='password'
// //           />
// //         </div>
// //         <button onClick={signin} className='btn btn-primary w-100'>
// //           Sign In
// //         </button>
// //         <div className='mt-3'>
// //           <Link to='/Kanbas/Account/Signup'>Sign Up</Link>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }
// // import { useState } from 'react'
// // import { useDispatch } from 'react-redux'
// // import { setCurrentUser } from './reducer'

// // import { Link, useNavigate } from 'react-router-dom'
// // import * as client from './client'

// // export default function Signin () {
// //   const [error, setError] = useState('')

// //   const [credentials, setCredentials] = useState<any>({})
// //   const navigate = useNavigate()
// //   const dispatch = useDispatch()
// //   const signin = async () => {
// //     try {
// //       const currentUser = await client.signin(credentials)
// //       dispatch(setCurrentUser(currentUser))
// //       navigate('/Kanbas/Account/Profile')
// //     } catch (err: any) {
// //       setError(err.response.data.message)
// //     }
// //   }

// //   return (
// //     <div className='container mt-5'>
// //       <h1 className='mb-4'>Sign In</h1>
// //       {error && <div className='alert alert-danger'>{error}</div>}

// //       <div className='card p-4'>
// //         <div className='mb-3'>
// //           <label className='form-label'>Username</label>
// //           <input
// //             onChange={e =>
// //               setCredentials({ ...credentials, username: e.target.value })
// //             }
// //             value={credentials.username}
// //             className='form-control'
// //             placeholder='Username'
// //           />
// //         </div>
// //         <div className='mb-3'>
// //           <label className='form-label'>Password</label>
// //           <input
// //             onChange={e =>
// //               setCredentials({ ...credentials, password: e.target.value })
// //             }
// //             value={credentials.password}
// //             className='form-control'
// //             placeholder='Password'
// //             type='password'
// //           />
// //         </div>
// //         <button onClick={signin} className='btn btn-primary w-100'>
// //           Sign In
// //         </button>
// //         <div className='mt-3'>
// //           <Link to='/Kanbas/Account/Signup'>Sign Up</Link>
// //         </div>
// //       </div>

// //       <div className='mt-5 text-center'>
// //         <h2
// //           className='mb-3'
// //           style={{ fontFamily: 'Cursive', color: '#FF5733' }}
// //         >
// //           Developed by:
// //         </h2>
// //         <p className='mb-1' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
// //           Athul Dinesh
// //         </p>
// //         <p className='mb-1' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
// //           Divya Chenduran Ayyemperumal
// //         </p>
// //         <p className='mb-1' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
// //           Huu Phuong An Bui
// //         </p>
// //         <p className='mb-4' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
// //           Niyati Nilesh Gohel
// //         </p>
// //         <div>
// //           <h3
// //             className='mb-3'
// //             style={{ fontFamily: 'Cursive', color: '#FF5733' }}
// //           >
// //             Git Repositories:
// //           </h3>
// //           <a
// //             href='https://github.com/Diva1318/Kanbas-Quiz/tree/main'
// //             target='_blank'
// //             rel='noopener noreferrer'
// //             className='btn btn-link'
// //           >
// //             Kanbas Quiz Repository
// //           </a>
// //           <a
// //             href='https://github.com/phganie/kanbas-server/tree/main'
// //             target='_blank'
// //             rel='noopener noreferrer'
// //             className='btn btn-link'
// //           >
// //             Kanbas Server Repository
// //           </a>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }
// import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { setCurrentUser } from './reducer'

// import { Link, useNavigate } from 'react-router-dom'
// import * as client from './client'

// export default function Signin () {
//   const [error, setError] = useState('')

//   const [credentials, setCredentials] = useState<any>({})
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const signin = async () => {
//     try {
//       const currentUser = await client.signin(credentials)
//       dispatch(setCurrentUser(currentUser))
//       navigate('/Kanbas/Account/Profile')
//     } catch (err: any) {
//       setError(err.response.data.message)
//     }
//   }

//   return (
//     <div className='container mt-5'>
//       <h1 className='mb-4'>Sign In</h1>
//       {error && <div className='alert alert-danger'>{error}</div>}

//       <div className='card p-4'>
//         <div className='mb-3'>
//           <label className='form-label'>Username</label>
//           <input
//             onChange={e =>
//               setCredentials({ ...credentials, username: e.target.value })
//             }
//             value={credentials.username}
//             className='form-control'
//             placeholder='Username'
//           />
//         </div>
//         <div className='mb-3'>
//           <label className='form-label'>Password</label>
//           <input
//             onChange={e =>
//               setCredentials({ ...credentials, password: e.target.value })
//             }
//             value={credentials.password}
//             className='form-control'
//             placeholder='Password'
//             type='password'
//           />
//         </div>
//         <button onClick={signin} className='btn btn-primary w-100'>
//           Sign In
//         </button>
//         <div className='mt-3'>
//           <Link to='/Kanbas/Account/Signup'>Sign Up</Link>
//         </div>
//       </div>

//       <div className='mt-5 text-center'>
//         <h2
//           className='mb-3'
//           style={{ fontFamily: 'Cursive', color: '#FF5733' }}
//         >
//           Developed by:
//         </h2>
//         <p className='mb-1' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
//           Athul Dinesh
//         </p>
//         <p className='mb-1' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
//           Divya Chenduran Ayyemperumal
//         </p>
//         <p className='mb-1' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
//           Huu Phuong An Bui
//         </p>
//         <p className='mb-4' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
//           Niyati Nilesh Gohel
//         </p>
//         <div>
//           <h3
//             className='mb-3'
//             style={{ fontFamily: 'Cursive', color: '#FF5733' }}
//           >
//             Git Repositories:
//           </h3>
//           <a
//             href='https://github.com/Diva1318/Kanbas-Quiz/tree/main'
//             target='_blank'
//             rel='noopener noreferrer'
//             className='btn btn-link'
//           >
//             Kanbas Quiz Repository
//           </a>
//           <a
//             href='https://github.com/phganie/kanbas-server/tree/main'
//             target='_blank'
//             rel='noopener noreferrer'
//             className='btn btn-link'
//           >
//             Kanbas Server Repository
//           </a>
//         </div>
//         <div className='mt-5'>
//           <p
//             style={{
//               fontFamily: 'Cursive',
//               color: 'Black',
//               fontSize: '0.9em'
//             }}
//           >
//             © 2024 <strong>Jose Annunizato</strong>, Athul Dinesh, Divya
//             Chenduran Ayyemperumal, Huu Phuong An Bui, Niyati Nilesh Gohel. All
//             rights reserved.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from './reducer'
import { Link, useNavigate } from 'react-router-dom'
import * as client from './client'
import './Signin.css' // Add a CSS file for additional styling

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

      <div className='mt-5 text-center'>
        <h2
          className='mb-3'
          style={{ fontFamily: 'Cursive', color: '#FF5733' }}
        >
          Developed by:
        </h2>
        <p className='mb-1' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          Athul Dinesh
        </p>
        <p className='mb-1' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          Divya Chenduran Ayyemperumal
        </p>
        <p className='mb-1' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          Huu Phuong An Bui
        </p>
        <p className='mb-4' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          Niyati Nilesh Gohel
        </p>
        <div>
          <h3
            className='mb-3'
            style={{ fontFamily: 'Cursive', color: '#FF5733' }}
          >
            Git Repositories:
          </h3>
          <a
            href='https://github.com/Diva1318/Kanbas-Quiz/tree/main'
            target='_blank'
            rel='noopener noreferrer'
            className='btn btn-link'
          >
            Kanbas Quiz Repository
          </a>
          <a
            href='https://github.com/phganie/kanbas-server/tree/main'
            target='_blank'
            rel='noopener noreferrer'
            className='btn btn-link'
          >
            Kanbas Server Repository
          </a>
        </div>
        <p className='mb-4' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          Thank you Professor, we really enjoyed the class :D
        </p>

        <div className='mt-5'>
          <img
            src='https://i.imgflip.com/4/4t0m5.jpg'
            alt='Meme'
            className='meme'
          />
          <p
            style={{ fontFamily: 'Cursive', color: 'Black', fontSize: '0.9em' }}
          >
            © 2024 <strong>Jose Annunizato</strong>, Athul Dinesh, Divya
            Chenduran Ayyemperumal, Huu Phuong An Bui, Niyati Nilesh Gohel. All
            rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
