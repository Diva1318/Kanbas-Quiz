import { BsGripVertical, BsPlus } from 'react-icons/bs'
import { FaCheckCircle, FaPlus, FaSearch, FaTrash } from 'react-icons/fa'
import { IoIosRocket } from 'react-icons/io'
import { IoEllipsisVertical } from 'react-icons/io5'
import { VscNotebook } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import './style.css'
import { addQuizzes, deleteQuizzes, updateQuizzes, setQuizzes } from './reducer'
import * as client from './client'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { AiOutlineStop } from 'react-icons/ai'
import { MdOutlineModeEditOutline } from 'react-icons/md' // Import edit icon

const defaultDate = new Date().toISOString().split('T')[0]

export default function Quiz () {
  const { cid } = useParams()
  const dispatch = useDispatch()

  const quizzes = useSelector((state: any) =>
    state.quizzesReducer.quizzes.filter((quiz: any) => quiz.course === cid)
  )

  const { currentUser } = useSelector((state: any) => state.accountReducer)
  const userRole = currentUser.role

  const fetchQuizzes = async () => {
    try {
      const quizzes = await client.findQuizzesForCourse(cid as string)
      dispatch(setQuizzes(quizzes))
    } catch (error) {
      console.error('Error fetching quizzes:', error)
    }
  }

  useEffect(() => {
    fetchQuizzes()
  }, [cid, dispatch])

  const [showModal, setShowModal] = useState(false)
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState<{ [key: string]: boolean }>({}) // State for popup menu

  const handleDeleteClick = (quizId: string) => {
    setSelectedQuizId(quizId)
    setShowModal(true)
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, "MMM d 'at' h a")
    } catch (error) {
      console.error('Error formatting date:', error)
      return dateString
    }
  }

  const handleDeleteConfirm = async () => {
    if (selectedQuizId) {
      await client.deleteQuiz(selectedQuizId)
      dispatch(deleteQuizzes(selectedQuizId))
      setShowModal(false)
      setSelectedQuizId(null)
    }
  }

  const handleDeleteCancel = () => {
    setShowModal(false)
    setSelectedQuizId(null)
  }

  const togglePopup = (quizId: string) => {
    setShowPopup(prev => ({
      ...prev,
      [quizId]: !prev[quizId]
    }))
  }

  const filteredQuizzes =
    userRole === 'STUDENT'
      ? quizzes.filter((quiz: any) => quiz.published)
      : quizzes

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
        {userRole === 'FACULTY' && (
          <div className='d-flex'>
            <Link
              to={`/Kanbas/Courses/${cid}/Quizzes/New`}
              className='btn btn-danger'
            >
              <FaPlus className='me-1' />
              Quiz
            </Link>
            <button className='btn btn-secondary btn-lg me-2'>
              <IoEllipsisVertical className='fs-4' />
            </button>
          </div>
        )}
      </div>
      <ul className='list-group p-0 mb-5 fs-5 border-gray'>
        <li className='list-group-item'>
          <h3 id='wd-quizzes-title' className='bg-light p-3 ps-2'>
            <BsGripVertical className='me-2 fs-3' />
            Quizzes
            <div className='d-flex float-end'>
              <button className='percentage-badge border-gray float-end'>
                20% of Total
              </button>
            </div>
          </h3>

          <div id='wd-quiz-list' className='list-group rounded-0'>
            {filteredQuizzes.map((quiz: any) => (
              <li
                key={quiz._id}
                className='wd-quiz-list-item list-group-item p-3 ps-1'
              >
                <div className='d-flex align-items-center'>
                  <div className='icons-wrapper'>
                    <BsGripVertical className='me-2 fs-3 icon-color' />
                    <IoIosRocket className='me-2 fs-5 icon-color' />
                  </div>
                  <div className='flex-grow-1'>
                    <Link
                      className='wd-assignment-link text-green no-underline'
                      to={`/Kanbas/Courses/${cid}/quizzes/${quiz._id}`}
                    >
                      <strong>{quiz.title}</strong>
                    </Link>
                    <br />
                    <span className='wd-quiz-details'>
                      <strong> Available </strong>
                      <span className='text-danger'>Multiple Dates</span> |
                      <strong> Not available until </strong>{' '}
                      {formatDate(quiz.availableFrom) ||
                        formatDate(defaultDate)}{' '}
                      |
                      <br />
                      <strong> Due</strong>{' '}
                      {formatDate(quiz.dueDate) || defaultDate} |
                      <strong> {quiz.points || 'No'}</strong> pts
                    </span>
                  </div>
                  {userRole === 'FACULTY' && (
                    <div className='d-flex position-relative'>
                      <div className='d-flex'>
                        {quiz.published ? (
                          <FaCheckCircle className='text-success me-2' />
                        ) : (
                          <AiOutlineStop className='text-danger me-2' />
                        )}
                      </div>
                      <IoEllipsisVertical
                        className='fs-5'
                        onClick={() => togglePopup(quiz._id)}
                      />
                      {showPopup[quiz._id] && (
                        <div className='popup-menu position-absolute'>
                          <Link
                            id='wd-quiz-edit-btn'
                            className='dropdown-item'
                            to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/editor`}
                          >
                            <MdOutlineModeEditOutline />
                            Edit
                          </Link>
                          <button
                            className='dropdown-item text-danger'
                            onClick={() => handleDeleteClick(quiz._id)}
                          >
                            <FaTrash />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </div>
        </li>
      </ul>

      {/* Delete Confirmation Modal */}
      {showModal && <div className='modal-backdrop fade show'></div>}
      <div
        id='wd-delete-quiz-modal'
        className={`modal fade ${showModal ? 'show d-block' : ''}`}
        role='dialog'
        style={{ display: showModal ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title fs-5' id='staticBackdropLabel'>
                Delete Quiz
              </h5>
              <button
                type='button'
                className='btn-close'
                onClick={handleDeleteCancel}
              ></button>
            </div>
            <div className='modal-body'>
              <p>Are you sure you want to delete this quiz?</p>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
              <button
                type='button'
                className='btn btn-danger'
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
