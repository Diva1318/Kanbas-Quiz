import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { addAssignment, updateAssignment, setAssignments } from './reducer'
import * as client from './client'
import './styles.css'

export default function AssignmentEditor () {
  const { cid, aid } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchAssignment = async () => {
    if (aid !== 'New') {
      const assignment = await client.findAssignment(
        cid as string,
        aid as string
      )
      dispatch(setAssignments([assignment])) // Set state with the fetched assignment
    }
  }

  useEffect(() => {
    fetchAssignment()
  }, [cid, aid])

  const assignment = useSelector((state: any) =>
    state.assignmentsReducer.assignments.find((a: any) => a._id === aid)
  )

  const [assignmentName, setAssignmentName] = useState('')
  const [assignmentDescription, setAssignmentDescription] = useState('')
  const [assignmentPoints, setAssignmentPoints] = useState(0)
  const [assignmentDueDate, setAssignmentDueDate] = useState('')
  const [assignmentAvailableFrom, setAssignmentAvailableFrom] = useState('')
  const [assignmentAvailableUntil, setAssignmentAvailableUntil] = useState('')

  useEffect(() => {
    if (assignment) {
      setAssignmentName(assignment.title)
      setAssignmentDescription(assignment.description)
      setAssignmentPoints(assignment.points)
      setAssignmentDueDate(assignment.dueDate)
      setAssignmentAvailableFrom(assignment.availableFrom)
      setAssignmentAvailableUntil(assignment.availableUntil)
    }
  }, [assignment])

  const handleSubmit = async () => {
    if (aid !== 'New') {
      const updatedAssignment = {
        _id: aid,
        title: assignmentName,
        description: assignmentDescription,
        points: assignmentPoints,
        dueDate: assignmentDueDate,
        availableFrom: assignmentAvailableFrom,
        availableUntil: assignmentAvailableUntil,
        course: cid
      }
      await client.updateAssignment(updatedAssignment)
      dispatch(updateAssignment(updatedAssignment))
    } else {
      const newAssignment = {
        _id: new Date().getTime().toString(),
        title: assignmentName,
        description: assignmentDescription,
        points: assignmentPoints,
        dueDate: assignmentDueDate,
        availableFrom: assignmentAvailableFrom,
        availableUntil: assignmentAvailableUntil,
        course: cid
      }
      await client.createAssignment(cid as string, newAssignment)
      dispatch(addAssignment(newAssignment))
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`)
  }

  return (
    <div id='wd-assignments-editor' className='container mt-5'>
      <div className='mb-4'>
        <label htmlFor='wd-name' className='form-label'>
          <h3>Assignment Name</h3>
        </label>
        <input
          id='wd-name'
          className='form-control'
          placeholder='Assignment Name'
          value={assignmentName}
          onChange={e => setAssignmentName(e.target.value)}
        />
      </div>

      <div className='mb-4'>
        <div id='wd-description' className=''>
          <textarea
            id='wd-description'
            className='form-control'
            placeholder='Assignment Description'
            value={assignmentDescription}
            onChange={e => setAssignmentDescription(e.target.value)}
          />
        </div>
      </div>

      <form>
        <div className='mb-3 row'>
          <div className='float-end d-flex me-1'>
            <label htmlFor='wd-points' className='col-sm-3 col-form-label'>
              Points
            </label>
            <input
              id='wd-points'
              className='form-control'
              type='number'
              value={assignmentPoints}
              onChange={e => setAssignmentPoints(Number(e.target.value))}
            />
          </div>
        </div>
        <div className='mb-4 row'>
          <div className='col-sm-6 card p-4 col-md'>
            <div className='mb-4 row float-end d-flex'>
              <div>
                <label htmlFor='wd-due-date' className='form-label'>
                  Due
                </label>
                <input
                  id='wd-due-date'
                  className='form-control'
                  type='date'
                  value={assignmentDueDate}
                  onChange={e => setAssignmentDueDate(e.target.value)}
                />
              </div>
            </div>
            <div className='mb-4 row'>
              <div className='col-md-6'>
                <label htmlFor='wd-available-from' className='form-label'>
                  Available from
                </label>
                <input
                  id='wd-available-from'
                  className='form-control'
                  type='date'
                  value={assignmentAvailableFrom}
                  onChange={e => setAssignmentAvailableFrom(e.target.value)}
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='wd-available-until' className='form-label'>
                  Until
                </label>
                <input
                  id='wd-available-until'
                  className='form-control'
                  type='date'
                  value={assignmentAvailableUntil}
                  onChange={e => setAssignmentAvailableUntil(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <hr />
      <div className='d-flex justify-content-end'>
        <Link
          to={`/Kanbas/Courses/${cid}/Assignments`}
          className='btn btn-secondary me-2'
        >
          Cancel
        </Link>
        <button className='btn btn-danger' onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  )
}
