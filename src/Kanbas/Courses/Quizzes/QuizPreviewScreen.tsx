import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css' // Ensure Bootstrap is imported

// Define types for question and answers
interface Question {
  id: number
  text: string
  options: string[]
}

interface Answers {
  [key: number]: string
}

// Mock data to simulate server responses
const mockQuestions: Question[] = [
  {
    id: 1,
    text: 'An HTML label element can be associated with an HTML input element by setting their id attributes to the same value. The resulting effect is that when you click on the label text, the input element receives focus as if you had clicked on the input element itself.',
    options: ['True', 'False']
  }
  // Add more questions as needed
]

const mockPreviousAnswers: Answers = {
  1: 'True'
  // Add previous answers for other questions if needed
}

const QuizPreview: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Answers>({})
  const [previousAnswers, setPreviousAnswers] = useState<Answers>({})

  useEffect(() => {
    // Simulate fetching quiz questions
    setQuestions(mockQuestions)

    // Simulate fetching previous answers
    setPreviousAnswers(mockPreviousAnswers)
  }, [quizId])

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    })
  }

  const handleSubmit = () => {
    console.log('Quiz submitted successfully:', answers)
    // Handle successful submission, e.g., display score or save to local storage
    localStorage.setItem(`quiz-${quizId}-answers`, JSON.stringify(answers))
  }

  const handleEditQuiz = () => {
    navigate(`/quizzes/${quizId}/edit`)
  }

  return (
    <div className='container mt-5'>
      <h1>Q1 - HTML</h1>
      <div className='alert alert-info' role='alert'>
        This is a preview of the published version of the quiz
      </div>
      <h2>Quiz Instructions</h2>
      {questions.map((question, index) => (
        <div key={question.id} className='card mb-3'>
          <div className='card-header d-flex justify-content-between'>
            <h3>Question {index + 1}</h3>
            <span>1 pts</span>
          </div>
          <div className='card-body'>
            <p>{question.text}</p>
            <div className='list-group'>
              {question.options.map(option => (
                <label
                  key={option}
                  className='list-group-item d-flex align-items-center'
                >
                  <input
                    type='radio'
                    name={`question-${question.id}`}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={() => handleAnswerChange(question.id, option)}
                    className='me-2'
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className='d-flex justify-content-between mt-3'>
        <button
          onClick={handleEditQuiz}
          className='btn btn-secondary rounded-pill'
        >
          Keep Editing This Quiz
        </button>
        <button onClick={handleSubmit} className='btn btn-primary rounded-pill'>
          Submit Quiz
        </button>
      </div>
    </div>
  )
}

export default QuizPreview
