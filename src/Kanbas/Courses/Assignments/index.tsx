import React, { useState, useEffect } from 'react'
import { BsGripVertical, BsPlus } from 'react-icons/bs'
import { FaCheckCircle, FaPlus, FaSearch, FaTrash } from 'react-icons/fa'
import { IoEllipsisVertical } from 'react-icons/io5'
import { VscNotebook } from 'react-icons/vsc'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignments
} from './reducer'
import './styles.css'
import * as client from './client'

export default function Assignments () {
  const { cid } = useParams()
  const assignments = useSelector((state: any) =>
    state.assignmentsReducer.assignments.filter(
      (assignment: any) => assignment.course === cid
    )
  )
  console.log(assignments)
  const dispatch = useDispatch()

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string)
    dispatch(setAssignments(assignments))
  }

  useEffect(() => {
    fetchAssignments()
  }, [cid])

  const [showModal, setShowModal] = useState(false)
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null)

  const handleDeleteClick = (assignmentId: any) => {
    setSelectedAssignmentId(assignmentId)
    setShowModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedAssignmentId) {
      await client.deleteAssignment(selectedAssignmentId)
      dispatch(deleteAssignment(selectedAssignmentId))
      setShowModal(false)
      setSelectedAssignmentId(null)
    }
  }

  const handleDeleteCancel = () => {
    setShowModal(false)
    setSelectedAssignmentId(null)
  }

  const defaultDate = new Date().toISOString().split('T')[0]

  return (
    <div id='wd-assignments' className='container'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <div className='input-group w-50'>
          <span className='input-group-text bg-white border-end-0'>
            <FaSearch />
          </span>
          <input
            id='wd-search-assignment'
            className='form-control border-start-0'
            placeholder='Search for Assignments'
          />
        </div>
        <div className='d-flex'>
          <button id='wd-add-assignment-group' className='btn btn-light me-2'>
            <FaPlus className='me-1' />
            Group
          </button>
          <Link
            to={`/Kanbas/Courses/${cid}/Assignments/New`}
            className='btn btn-danger'
          >
            <FaPlus className='me-1' />
            Assignment
          </Link>
        </div>
      </div>

      <li className='list-group-item p-0 mb-5 fs-5 border-gray'>
        <h3 id='wd-assignments-title' className='bg-light p-3 ps-2'>
          <BsGripVertical className='me-2 fs-3' />
          ASSIGNMENTS
          <div className='d-flex float-end'>
            <button className='percentage-badge border-gray float-end'>
              40% of Total
            </button>
            <BsPlus
              className='fs-2 position-relative'
              style={{ bottom: '1px' }}
            />
            <IoEllipsisVertical className='fs-4' />
          </div>
        </h3>

        <ul id='wd-assignment-list' className='list-group rounded-0'>
          {assignments.map((assignment: any) => (
            <li
              key={assignment._id}
              className='wd-assignment-list-item list-group-item p-3 ps-1'
            >
              <div className='d-flex align-items-center'>
                <div className='icons-wrapper'>
                  <BsGripVertical className='me-2 fs-3 icon-color' />
                  <VscNotebook className='me-2 fs-5 icon-color' />
                </div>
                <div className='flex-grow-1'>
                  <Link
                    className='wd-assignment-link text-green no-underline'
                    to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                  >
                    <strong>{assignment.title}</strong>
                  </Link>
                  <br />
                  <span className='wd-assignment-details'>
                    <span className='text-danger'>Multiple Modules</span> |
                    <strong> Not available until </strong>{' '}
                    {assignment.availableFrom || defaultDate} |
                    <br />
                    <strong> Due</strong> {assignment.dueDate || defaultDate} |{' '}
                    {assignment.points || 'No'} pts
                  </span>
                </div>
                <FaCheckCircle className='text-success me-2' />
                <FaTrash
                  className='text-danger me-2'
                  onClick={() => handleDeleteClick(assignment._id)}
                />
                <IoEllipsisVertical className='fs-5' />
              </div>
            </li>
          ))}
        </ul>
      </li>

      {/* Delete Confirmation Modal */}
      {showModal && <div className='modal-backdrop fade show'></div>}
      <div
        id='wd-delete-assignment-modal'
        className={`modal fade ${showModal ? 'show d-block' : ''}`}
        role='dialog'
        style={{ display: showModal ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title fs-5' id='staticBackdropLabel'>
                Delete Assignment
              </h5>
              <button
                type='button'
                className='btn-close'
                onClick={handleDeleteCancel}
              ></button>
            </div>
            <div className='modal-body'>
              <p>Are you sure you want to delete this assignment?</p>
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
