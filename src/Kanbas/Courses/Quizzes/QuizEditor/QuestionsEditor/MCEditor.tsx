import { useState } from 'react'
import { FaTrash } from 'react-icons/fa6'
import RichTextEditor from '../../../../RichTextEditor'

export default function MCEditor () {
  const [question, setQuestion] = useState('')
  const [points, setPoints] = useState(0)
  const [answers, setAnswers] = useState([{ text: '', isCorrect: false }])

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value)
  }

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoints(Number(e.target.value))
  }

  const handleAnswerChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAnswers = [...answers]
    newAnswers[index].text = e.target.value
    setAnswers(newAnswers)
  }

  const handleCorrectChange = (index: number) => {
    const newAnswers = answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === index
    }))
    setAnswers(newAnswers)
  }

  const addAnswer = () => {
    setAnswers([...answers, { text: '', isCorrect: false }])
  }

  const removeAnswer = (index: number) => {
    setAnswers(answers.filter((_, i) => i !== index))
  }

  return (
    <div className='mc-editor'>
      <div className=''>
        <p>
          Enter your question and multiple answers, then select the one correct
          answer.
        </p>
      </div>
      <div className=''>
        <label htmlFor='question' className='form-label'>
          <strong>Description:</strong>
        </label>
        {/* <textarea
          id='question'
          className='form-control'
          value={question}
          onChange={handleQuestionChange}
        /> */}
        <RichTextEditor
          value={''}
          onChange={function (value: string): void {
            throw new Error('Function not implemented.')
          }}
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Answers:</label>
        {answers.map((answer, index) => (
          <div key={index} className='input-group mb-2'>
            <span className='input-group-text'>
              {answer.isCorrect ? (
                <span className='text-success'>Correct Answer</span>
              ) : (
                'Possible Answer'
              )}
            </span>
            <input
              type='text'
              className='form-control'
              value={answer.text}
              onChange={e => handleAnswerChange(index, e)}
            />
            <button
              type='button'
              className={`btn ${
                answer.isCorrect ? 'btn-success' : 'btn-outline-secondary'
              }`}
              onClick={() => handleCorrectChange(index)}
            >
              <i className='bi bi-check'></i>
              Correct answer
            </button>
            <button
              type='button'
              className='btn btn-outline-secondary'
              onClick={() => removeAnswer(index)}
            >
              <i className='bi bi-trash'></i>
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          type='button'
          className='btn btn-outline-primary'
          onClick={addAnswer}
        >
          + Add Another Answer
        </button>
      </div>
    </div>
  )
}
