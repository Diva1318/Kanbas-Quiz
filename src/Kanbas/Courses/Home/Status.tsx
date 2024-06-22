// import { MdDoNotDisturbAlt } from 'react-icons/md'
// import { TfiAnnouncement } from 'react-icons/tfi'
// import { CiBellOn } from 'react-icons/ci'
// import { MdOutlineBroadcastOnHome } from 'react-icons/md'
// import { FaChartBar, FaCheckCircle } from 'react-icons/fa'
// import { BiImport } from 'react-icons/bi'
// import { LiaFileImportSolid } from 'react-icons/lia'

// export default function CourseStatus () {
//   return (
//     <div id='wd-course-status' style={{ width: '300px' }}>
//       <h2>Course Status</h2>
//       <div className='d-flex'>
//         <div className='w-50 pe-1'>
//           <button className='btn btn-lg btn-secondary w-100 text-nowrap '>
//             <MdDoNotDisturbAlt className='me-2 fs-5' />
//             Unpublish
//           </button>
//         </div>
//         <button className='btn btn-lg btn-success w-100'>
//           <FaCheckCircle className='me-2 fs-5' />
//           Publish
//         </button>
//       </div>
//       <br />
//       <button className='btn btn-lg btn-secondary w-100 mt-1 text-start'>
//         <BiImport className='me-2 fs-5' />
//         Import Existing Content
//       </button>{' '}
//       <br />
//       <button className='btn btn-lg btn-secondary w-100 mt-1 text-start'>
//         <LiaFileImportSolid className='me-2 fs-5' />
//         Import from Commons
//       </button>{' '}
//       <br />
//       <button className='btn btn-lg btn-secondary w-100 mt-1 text-start'>
//         <MdOutlineBroadcastOnHome className='me-2 fs-5' />
//         Choose Home Page
//       </button>{' '}
//       <br />
//       <button className='btn btn-lg btn-secondary w-100 mt-1 text-start'>
//         <FaChartBar className='me-2 fs-5' />
//         View Course Stream
//       </button>{' '}
//       <br />
//       <button className='btn btn-lg btn-secondary w-100 mt-1 text-start'>
//         <TfiAnnouncement className='me-2 fs-5' />
//         New Annoucement
//       </button>{' '}
//       <br />
//       <button className='btn btn-lg btn-secondary w-100 mt-1 text-start'>
//         <FaChartBar className='me-2 fs-5' />
//         New Analytics
//       </button>{' '}
//       <br />
//       <button className='btn btn-lg btn-secondary w-100 mt-1 text-start'>
//         <CiBellOn className='me-2 fs-5' />
//         View Course Notifications
//       </button>
//     </div>
//   )
// }
import { MdDoNotDisturbAlt } from 'react-icons/md'
import { TfiAnnouncement } from 'react-icons/tfi'
import { CiBellOn } from 'react-icons/ci'
import { MdOutlineBroadcastOnHome } from 'react-icons/md'
import { FaChartBar, FaCheckCircle } from 'react-icons/fa'
import { BiImport } from 'react-icons/bi'
import { LiaFileImportSolid } from 'react-icons/lia'

export default function CourseStatus () {
  return (
    <div id='wd-course-status' style={{ width: '300px' }}>
      <h2>Course Status</h2>
      <div className='d-flex'>
        <div className='w-50 pe-1'>
          <button className='btn btn-lg btn-secondary w-100 text-nowrap '>
            <MdDoNotDisturbAlt className='me-2 fs-5' />
            Unpublish
          </button>
        </div>
        <button className='btn btn-lg btn-success w-100'>
          <FaCheckCircle className='me-2 fs-5' />
          Publish
        </button>
      </div>
      <br />
      <button className='btn btn-lg btn-secondary w-100 mt-1 text-start'>
        <BiImport className='me-2 fs-5' />
        Import Existing Content
      </button>{' '}
      <br />
      <button className='btn btn-lg btn-secondary w-100 mt-1 text-start'>
        <LiaFileImportSolid className='me-2 fs-5' />
        Import from Commons
      </button>{' '}
      <br />
      <button className='btn btn-lg btn-secondary w-100 mt-1 text-start'>
        <MdOutlineBroadcastOnHome className='me-2 fs-5' />
        Choose Home Page
      </button>{' '}
      <br />
      <button className='btn btn-lg btn-secondary w-100 mt-1 text-start'>
        <FaChartBar className='me-2 fs-5' />
        View Course Stream
      </button>{' '}
      <br />
      <button className='btn btn-lg btn-secondary w-100 mt-1 text-start'>
        <TfiAnnouncement className='me-2 fs-5' />
        New Annoucement
      </button>{' '}
      <br />
      <button className='btn btn-lg btn-secondary w-100 mt-1 text-start'>
        <FaChartBar className='me-2 fs-5' />
        New Analytics
      </button>{' '}
      <br />
      <button className='btn btn-lg btn-secondary w-100 mt-1 text-start'>
        <CiBellOn className='me-2 fs-5' />
        View Course Notifications
      </button>
    </div>
  )
}
