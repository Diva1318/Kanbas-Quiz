import React, { useState } from 'react'
import RichTextEditor from '../../../../RichTextEditor'

interface Question {
  title: string
  _id: string
  text: string
  points: number
  type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false'
  options?: string[]
  answers: string[]
}

interface Answer {
  text: string
  isCorrect: boolean
}

interface FillInTheBlanksEditorProps {
  question: Question
}

export default function QuizEditorTOC ({
  question: initialQuestion
}: FillInTheBlanksEditorProps) {
  const [editorValue, setEditorValue] = useState('')

  const handleEditorChange = (value: string) => {
    setEditorValue(value)
  }

  return (
    <div>
      <p>
        Enter your question text, then select True or False as the correct
        answer.
      </p>
      <div className='mb-3'>
        <label htmlFor='question' className='form-label'>
          <strong>Question:</strong>
        </label>
        <RichTextEditor value={editorValue} onChange={handleEditorChange} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Answers:</label>
        <div className='form-check'>
          <input
            type='radio'
            id='true'
            name='answer'
            className='form-check-input'
          />
          <label htmlFor='true' className='form-check-label'>
            True
          </label>
        </div>
        <div className='form-check'>
          <input
            type='radio'
            id='false'
            name='answer'
            className='form-check-input'
          />
          <label htmlFor='false' className='form-check-label'>
            False
          </label>
        </div>
      </div>
    </div>
  )
}
