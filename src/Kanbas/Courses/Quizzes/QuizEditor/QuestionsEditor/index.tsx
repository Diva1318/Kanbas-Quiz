import React, { useState } from 'react'
import FillInTheBlanksEditor from './FillInTheBlanksEditor'
import MCEditor from './MCEditor'
import TFEditor from './TFEditor'

export default function QuizQuestionEditor () {
  const [selectedOption, setSelectedOption] = useState('1')
  const [points, setPoints] = useState(0)

  const renderEditor = () => {
    switch (selectedOption) {
      case '1':
        return <MCEditor />
      case '2':
        return <TFEditor />
      case '3':
        return <FillInTheBlanksEditor />
      default:
        return <MCEditor />
    }
  }

  return (
    <div>
      <h1>Quiz Question Editor</h1>
      <hr />
      <div>
        <div className='d-flex justify-content-center'>
          <button type='button' className='btn btn-danger mb-2'>
            + Add Question
          </button>
        </div>
        <hr />
        <div className='card'>
          <div className='card-header d-flex align-items-center justify-content-between'>
            <div className='me-2 flex-grow-1'>
              <input
                type='text'
                className='form-control'
                placeholder='Quiz Title'
              />
            </div>

            <div id='wd-css-styling-dropdowns' className='me-2'>
              <select
                className='form-select'
                value={selectedOption}
                onChange={e => setSelectedOption(e.target.value)}
              >
                <option value='1'>Multiple choice</option>
                <option value='2'>True/False</option>
                <option value='3'>Fill in the blanks</option>
              </select>
            </div>

            <div className='d-flex align-items-center'>
              <label htmlFor='points' className='form-label mb-0 me-2'>
                <strong>pts:</strong>
              </label>
              <input
                id='question-point'
                type='number'
                className='form-control d-inline-block w-auto'
                placeholder='0'
                value={points}
                onChange={e => setPoints(Number(e.target.value))}
                min='0'
                step='1'
              />
            </div>
          </div>
          <div className='card-body'>{renderEditor()}</div>
          <div className='d-flex justify-content-end m-3'>
            <button type='button' className='btn btn-secondary me-2'>
              Cancel
            </button>
            <button type='button' className='btn btn-danger'>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
