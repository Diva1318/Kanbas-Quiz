import { BsGripVertical, BsPlus } from 'react-icons/bs'
import { FaCheckCircle, FaPlus, FaSearch, FaTrash } from 'react-icons/fa'
import { IoIosRocket } from 'react-icons/io'
import { IoEllipsisVertical } from 'react-icons/io5'
import { VscNotebook } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import './style.css'

const defaultDate = new Date().toISOString().split('T')[0]

export default function QuizList () {
  return (
    <div id='wd-quiz-list' className='container'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <div className='input-group w-50'>
          <span className='input-group-text bg-white border-end-0'>
            <FaSearch />
          </span>
          <input
            id='wd-search-quizzes'
            className='form-control border-start-0'
            placeholder='Search for Quizzes'
          />
        </div>
        <div className='d-flex'>
          <button id='wd-add-assignment-group' className='btn btn-danger'>
            <FaPlus className='me-1' />
            Quiz
          </button>
          <button className='btn  btn-secondary btn-lg me-2'>
            <IoEllipsisVertical className='fs-4' />
          </button>
        </div>
      </div>
      <li className='list-group-item p-0 mb-5 fs-5 border-gray'>
        <h3 id='wd-quizzes-title' className='bg-light p-3 ps-2'>
          <BsGripVertical className='me-2 fs-3' />
          Quizzes
          <div className='d-flex float-end'>
            <button className='percentage-badge border-gray float-end'>
              20% of Total
            </button>
          </div>
        </h3>
        <ul id='wd-quiz-list' className='list-group rounded-0'>
          <li className='wd-quiz-list-item list-group-item p-3 ps-1'>
            <div className='d-flex align-items-center'>
              <div className='icons-wrapper'>
                <BsGripVertical className='me-2 fs-3 icon-color' />
                <IoIosRocket className='me-2 fs-5 icon-color' />
              </div>
              <div className='flex-grow-1'>
                {/* <Link
                                        className='wd-assignment-link text-green no-underline'
                                        to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                                    >
                                        <strong>{assignment.title}</strong>
                                    </Link> */}
                <strong>Q1-HTML</strong>
                <br />
                <span className='wd-quiz-details'>
                  <strong> Available </strong>
                  <span className='text-danger'>Multiple Dates</span> |
                  <strong> Not available until </strong> {defaultDate}|
                  <br />
                  <strong> Due</strong> {defaultDate} | 20 pts|3 questions
                </span>
              </div>
              <FaCheckCircle className='text-success me-2' />
              <FaTrash
                className='text-danger me-2'
                // onClick={() => handleDeleteClick(assignment._id)}
              />
              <IoEllipsisVertical className='fs-5' />
            </div>
          </li>
        </ul>
      </li>
    </div>
  )
}
