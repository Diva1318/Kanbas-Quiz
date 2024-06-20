import React, { useState, useEffect } from 'react'
import FillInTheBlanksEditor from './FillInTheBlanksEditor'
import MCEditor from './MCEditor'
import TFEditor from './TFEditor'
import * as client from '../../QuestionClient' // Adjust the import as necessary
import { useParams } from 'react-router'

interface Question {
  title: string
  _id: string
  text: string
  points: number
  type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false'
  options?: string[]
  answers: string[]
}

export default function QuizQuestionEditor () {
  const { qid } = useParams<{ qid: string }>()
  const [questions, setQuestions] = useState<Question[]>([])
  const [points, setPoints] = useState(0)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await client.findAllQuestionsByQuizId(qid as string)
        setQuestions(fetchedQuestions)
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }

    fetchQuestions()
  }, [qid])

  const renderEditor = (question: Question) => {
    switch (question.type) {
      case 'multiple-choice':
        return <MCEditor question={question} />
      case 'true-false':
        return <TFEditor question={question} />
      case 'fill-in-the-blank':
        return <FillInTheBlanksEditor question={question} />
      default:
        return <MCEditor question={question} />
    }
  }

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: '',
        _id: '',
        text: '',
        points: 0,
        type: 'multiple-choice',
        answers: []
      }
    ])
  }

  const handleSaveChanges = () => {
    // Logic to save changes
  }

  if (questions.length === 0) {
    return (
      <div className='d-flex justify-content-center'>
        <button
          type='button'
          className='btn btn-danger mb-2'
          onClick={handleAddQuestion}
        >
          + Add Question
        </button>
      </div>
    )
  }

  return (
    <div>
      <h1>Quiz Question Editor</h1>
      <hr />
      {questions.map((question, index) => (
        <div key={index} className='card mb-3'>
          <div className='card-header d-flex align-items-center justify-content-between'>
            <div className='me-2 flex-grow-1'>
              <input
                type='text'
                className='form-control'
                placeholder='Question Title'
                value={question.title}
                onChange={e => {
                  const updatedQuestions = [...questions]
                  updatedQuestions[index].title = e.target.value
                  setQuestions(updatedQuestions)
                }}
              />
            </div>

            <div id='wd-css-styling-dropdowns' className='me-2'>
              <select
                className='form-select'
                value={question.type}
                onChange={e => {
                  const updatedQuestions = [...questions]
                  updatedQuestions[index].type = e.target.value as
                    | 'multiple-choice'
                    | 'fill-in-the-blank'
                    | 'true-false'
                  setQuestions(updatedQuestions)
                }}
              >
                <option value='multiple-choice'>Multiple choice</option>
                <option value='true-false'>True/False</option>
                <option value='fill-in-the-blank'>Fill in the blanks</option>
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
                value={question.points}
                onChange={e => {
                  const updatedQuestions = [...questions]
                  updatedQuestions[index].points = Number(e.target.value)
                  setQuestions(updatedQuestions)
                }}
                min='0'
                step='1'
              />
            </div>
          </div>
          <div className='card-body'>{renderEditor(question)}</div>
          <div className='d-flex justify-content-end m-3'>
            <button type='button' className='btn btn-secondary me-2'>
              Cancel
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      ))}
      <div className='d-flex justify-content-center'>
        <button
          type='button'
          className='btn btn-danger mb-2'
          onClick={handleAddQuestion}
        >
          + Add Question
        </button>
      </div>
    </div>
  )
}
