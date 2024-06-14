import { FaFileImport, FaFileExport, FaSearch } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { BiFilterAlt } from 'react-icons/bi'
import { LiaFileExportSolid } from 'react-icons/lia'
import { useParams } from 'react-router-dom'
import * as db from '../../Database'

export default function Grades () {
  const { cid } = useParams()
  const courseAssignments = db.assignments.filter(a => a.course === cid)
  const courseEnrollments = db.enrollments.filter(e => e.course === cid)
  const courseUsers = courseEnrollments.map(e =>
    db.users.find(u => u._id === e.user)
  )
  const courseGrades = db.grades.filter(g =>
    courseAssignments.some(a => a._id === g.assignment)
  )

  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <div className='d-flex flex-column'>
          <label htmlFor='search-students' className='form-label'>
            Student Names
          </label>
          <div className='input-group'>
            <span className='input-group-text bg-white border-end-0'>
              <FaSearch />
            </span>
            <input
              id='search-students'
              className='form-control'
              type='text'
              placeholder='Search Students'
            />
            <button className='btn btn-light me-2'>
              <MdKeyboardArrowDown />
            </button>
          </div>
        </div>
        <div className='d-flex flex-column'>
          <label htmlFor='search-assignments' className='form-label'>
            Assignment Names
          </label>
          <div className='input-group'>
            <span className='input-group-text bg-white border-end-0'>
              <FaSearch />
            </span>

            <input
              id='search-assignments'
              className='form-control'
              type='text'
              placeholder='Search Assignments'
            />
            <button className='btn btn-light me-2'>
              <MdKeyboardArrowDown />
            </button>
          </div>
        </div>
        <div className='d-flex'>
          <button className='btn btn-light me-2'>
            <FaFileImport /> Import
          </button>
          <div className='btn-group'>
            <button
              className='btn btn-light me-2 dropdown-toggle'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <FaFileExport /> Export
            </button>
            <ul className='dropdown-menu'>
              <li>
                <a className='dropdown-item' href='#'>
                  Export Option 1
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='#'>
                  Export Option 2
                </a>
              </li>
            </ul>
          </div>

          <div className='btn-group'>
            <button className='btn btn-light me-2'>
              <IoMdSettings />
            </button>

            <ul className='dropdown-menu'>
              <li>
                <a className='dropdown-item' href='#'>
                  Export Option 1
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='#'>
                  Export Option 2
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <button
          className='btn btn-light me-2
'
        >
          <BiFilterAlt />
          Apply Filter
        </button>
      </div>

      <div className='table-responsive'>
        <table className='table table-striped'>
          <thead>
            <tr className='table-light'>
              <th>Student Name</th>
              {courseAssignments.map(a => (
                <th key={a._id}>
                  {a.title} <br /> Out of 100
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courseUsers.map(user => (
              <tr key={user?._id}>
                <td className='text-danger'>
                  {user?.firstName} {user?.lastName}
                </td>
                {courseAssignments.map(a => {
                  const grade = courseGrades.find(
                    g => g.student === user?._id && g.assignment === a._id
                  )
                  return (
                    <td key={a._id}>{grade ? `${grade.grade}%` : 'N/A'}</td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
