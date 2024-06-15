import React from 'react'
import { MdDoNotDisturbAlt } from 'react-icons/md'
import RichTextEditor from '../../../RichTextEditor'

export default function QuizDetailsEditor () {
  return (
    <div className='container mt-5'>
      <div className='quiz-header d-flex justify-content-between align-items-center mb-4'>
        <div>
          <h1>Quiz Details Editor</h1>
        </div>
        <div className='quiz-meta d-flex'>
          <span className='quiz-points me-3'>Points 0</span>
          <span className='quiz-published d-flex align-items-center'>
            <MdDoNotDisturbAlt className='me-2' />
            Not Published
          </span>
        </div>
      </div>
      <form>
        <div className='mb-3'>
          <label htmlFor='quiz-title' className='form-label'>
            Title
          </label>
          <input type='text' id='quiz-title' className='form-control' />
        </div>
        <div className='mb-3'>
          <label htmlFor='quiz-instructions' className='form-label'>
            Quiz Instructions:
          </label>
          <RichTextEditor />
        </div>

        <div id='wd-quiz-details' className='text-nowrap'>
          <table className='table table-borderless'>
            <tr>
              <td align='right' valign='top'>
                <label htmlFor='quiz-type' className='form-label'>
                  Quiz Type
                </label>
              </td>
              <td>
                <select id='quiz-type' className='form-control'>
                  <option value='graded'>Graded Quiz</option>
                  <option value='practice'>Practice Quiz</option>
                  <option value='graded-survey'>Graded Survey</option>
                  <option value='ungraded-survey'>Ungraded Survey</option>
                </select>
              </td>
            </tr>
            <br />
            <tr>
              <td align='right' valign='top'>
                <label htmlFor='assignment-group' className='form-label'>
                  Assignment Group
                </label>
              </td>
              <td>
                <select id='assignment-group' className='form-control'>
                  <option value='assignments'>Assignments</option>
                  <option value='quizzes'>Quizzes</option>
                  <option value='exams'>Exams</option>
                  <option value='projects'>Projects</option>
                </select>
              </td>
            </tr>
            <tr>
              <td></td>
              <h5>Options</h5>
              <div className='mb-3 form-check'>
                <input
                  type='checkbox'
                  id='shuffle-answers'
                  className='form-check-input'
                />
                <label htmlFor='shuffle-answers' className='form-check-label'>
                  Shuffle Answers
                </label>
                <br />
                <input
                  type='checkbox'
                  id='multiple-attempts'
                  className='form-check-input'
                />
                <label htmlFor='multiple-attempts' className='form-check-label'>
                  Allow Multiple Attempts
                </label>
                <br />
                <input
                  type='checkbox'
                  id='time-limit'
                  className='form-check-input'
                />
                <div className='d-flex me-3'>
                  <label htmlFor='time-limit' className='form-check-label ms-2'>
                    Time Limit (minutes)
                  </label>
                  <input
                    type='number'
                    id='time-limit'
                    className='form-control w-25 ms-2'
                  />
                </div>

                <input
                  type='checkbox'
                  id='show-correct-answers'
                  className='form-check-input'
                />
                <label htmlFor='show-correct-answers' className='form-label'>
                  Show Correct Answers
                </label>
                <br />
                <input
                  type='checkbox'
                  id='one-question-at-a-time'
                  className='form-check-input'
                />
                <label htmlFor='one-question-at-a-time' className='form-label'>
                  One Question at a Time{' '}
                </label>
                <br />
                <input
                  type='checkbox'
                  id='webcam-required'
                  className='form-check-input'
                />
                <label htmlFor='one-question-at-a-time' className='form-label'>
                  Webcam Required
                </label>
                <br />
                <input
                  type='checkbox'
                  id='lock-after-answer'
                  className='form-check-input'
                />
                <label htmlFor='lock-after-answer' className='form-label'>
                  Lock Questions After Answering
                </label>
              </div>
            </tr>

            <tr>
              <td align='right' valign='top'>
                Access code
              </td>
              <td>
                <input type='text' id='time-limit' className='form-control ' />
              </td>
            </tr>
            <br />

            <tr>
              <td align='right' valign='top'>
                Assign
              </td>
              <td>
                <div className='mb-4 card p-4'>
                  <div className='mb-4 row'>
                    <div className='col-md-6'>
                      <label htmlFor='' className='form-label'>
                        Assign to
                      </label>
                      <input
                        type='text'
                        id='assign-to'
                        className='form-control'
                      />
                    </div>

                    <div className='col-md-6'>
                      <label htmlFor='due-date' className='form-label'>
                        Due
                      </label>
                      <input
                        type='date'
                        id='due-date'
                        className='form-control'
                      />
                    </div>
                    <div className='col-md-6'>
                      <label htmlFor='available-from' className='form-label'>
                        Available From
                      </label>
                      <input
                        type='date'
                        id='available-from'
                        className='form-control'
                      />
                    </div>
                  </div>
                  <div className='mb-4 row'>
                    <div className='col-md-6'>
                      <label htmlFor='available-until' className='form-label'>
                        Until
                      </label>
                      <input
                        type='date'
                        id='available-until'
                        className='form-control'
                      />
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div className='d-flex justify-content-end'>
          <button type='button' className='btn btn-secondary me-2'>
            Cancel
          </button>
          <button type='button' className='btn btn-danger'>
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
