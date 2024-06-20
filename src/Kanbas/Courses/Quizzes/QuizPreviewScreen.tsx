import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import * as questionClient from './QuestionClient'
import * as quizClient from './client'
import { setQuestions as setQuestionsAction } from './QuestionsReducer'
import './style.css'

interface Question {
  title: string
  _id: string
  text: string
  points: number
  type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false'
  options?: string[]
  answers: string[]
}

interface Answers {
  [key: string]: string
}

interface Quiz {
  title: string
  multipleAttempts: boolean
}

export default function QuizPreview () {
  const { cid, quizId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [answers, setAnswers] = useState<Answers>({})
  const [score, setScore] = useState<number | null>(null)
  const [incorrectQuestions, setIncorrectQuestions] = useState<string[]>([])
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null)
  const [quizDetails, setQuizDetails] = useState<Quiz | null>(null)
  const [submitCount, setSubmitCount] = useState<number>(0)

  const questions = useSelector((state: any) =>
    state.questionsReducer.questions.filter(
      (question: any) => question.quiz === quizId
    )
  )

  const fetchQuestions = async () => {
    try {
      const fetchedQuestions = await questionClient.findAllQuestionsByQuizId(
        quizId as string
      )
      const questionsWithOptions = fetchedQuestions.map(
        (question: Question) => {
          if (
            question.type === 'true-false' &&
            (!question.options || question.options.length === 0)
          ) {
            return { ...question, options: ['True', 'False'] }
          }
          return question
        }
      )
      dispatch(setQuestionsAction(questionsWithOptions))
    } catch (error) {
      console.error('Error fetching questions:', error)
    }
  }

  const fetchQuizDetails = async () => {
    try {
      const fetchedQuizDetails = await quizClient.findQuiz(
        cid as string,
        quizId as string
      )
      setQuizDetails(fetchedQuizDetails)
      if (fetchedQuizDetails.multipleAttempts) {
        const savedAttemptsLeft = localStorage.getItem(
          `quiz-${quizId}-attemptsLeft`
        )
        setAttemptsLeft(savedAttemptsLeft ? parseInt(savedAttemptsLeft) : 3)
      }
    } catch (error) {
      console.error('Error fetching quiz details:', error)
    }
  }

  useEffect(() => {
    fetchQuestions()
    fetchQuizDetails()
  }, [quizId])

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    })
  }

  const handleSubmit = () => {
    let newScore = 0
    const incorrect = [] as any
    questions.forEach((question: Question) => {
      if (answers[question._id] === question.answers[0]) {
        newScore += question.points
      } else {
        incorrect.push(question._id)
      }
    })
    setScore(newScore)
    setIncorrectQuestions(incorrect)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    if (quizDetails?.multipleAttempts) {
      setAttemptsLeft(prev => {
        const newAttemptsLeft = prev !== null ? prev - 1 : null
        localStorage.setItem(
          `quiz-${quizId}-attemptsLeft`,
          newAttemptsLeft?.toString() || '0'
        )
        return newAttemptsLeft
      })
    }

    setSubmitCount(prevCount => prevCount + 1)
    console.log('Quiz submitted successfully:', answers, 'Score:', newScore)
  }

  const handleRetakeQuiz = () => {
    setAnswers({})
    setScore(null)
    setIncorrectQuestions([])
  }

  const getScoreComment = (percentage: number) => {
    if (percentage === 100) {
      return "Perfect score! You're a genius!"
    } else if (percentage >= 75) {
      return 'Great job! Almost perfect!'
    } else if (percentage >= 50) {
      return "Not bad! You're getting there!"
    } else if (percentage >= 25) {
      return 'You can do better! Keep trying!'
    } else {
      return 'Well, at least you tried. Better luck next time!'
    }
  }

  const handleEditQuiz = () => {
    navigate(`/Kanbas/Courses/${quizId}/QuizDetailsEditor`)
  }

  const totalPoints = questions.reduce(
    (acc: number, q: Question) => acc + q.points,
    0
  )
  const percentageScore = score !== null ? (score / totalPoints) * 100 : 0
  const scoreComment = getScoreComment(percentageScore)

  return (
    <div className='container mt-5'>
      {score !== null && (
        <div className='mt-4'>
          <div className='card text-center'>
            <div className='card-header'>
              <h3 className='card-title'>Total Score</h3>
            </div>
            <div className='card-body'>
              <h1 className='display-4'>{score}</h1>
              <p className='card-text'>
                You scored {score} points out of a possible {totalPoints}.<br />
              </p>
            </div>
            <div className='card-footer text-muted'>{scoreComment}</div>
          </div>
        </div>
      )}
      <h1>Quiz Preview</h1>
      <div className='mt-4'>
        <h3>Number of Attempts</h3>
        <div className='progress'>
          <div
            className='progress-bar'
            role='progressbar'
            style={{ width: `${(submitCount / 3) * 100}%` }}
            aria-valuenow={submitCount}
            aria-valuemin={0}
            aria-valuemax={3}
          >
            {submitCount}/3
          </div>
        </div>
      </div>
      <div className='alert alert-info' role='alert'>
        This is a preview of the published version of the quiz.
      </div>
      {quizDetails?.multipleAttempts && attemptsLeft !== null && (
        <div className='alert alert-warning' role='alert'>
          This quiz allows multiple attempts. Attempts left: {attemptsLeft}
        </div>
      )}
      <h2>Quiz Instructions</h2>
      {questions.map((question: Question, index: number) => (
        <div
          key={question._id}
          className={`card mb-3 ${
            incorrectQuestions.includes(question._id) ? 'border-danger' : ''
          }`}
        >
          <div className='card-header d-flex justify-content-between'>
            <h3>Question {index + 1}</h3>
            <span>{question.points} pts</span>
          </div>
          <div className='card-body'>
            <h4>{question.title}</h4>
            <p>{question.text}</p>
            {question.type === 'multiple-choice' && (
              <div className='list-group'>
                {question.options?.map(option => (
                  <label
                    key={option}
                    className='list-group-item d-flex align-items-center'
                  >
                    <input
                      type='radio'
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswerChange(question._id, option)}
                      className='me-2'
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {question.type === 'true-false' && (
              <div className='list-group'>
                {question.options?.map(option => (
                  <label
                    key={option}
                    className='list-group-item d-flex align-items-center'
                  >
                    <input
                      type='radio'
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswerChange(question._id, option)}
                      className='me-2'
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {question.type === 'fill-in-the-blank' && (
              <div className='mb-3'>
                <input
                  type='text'
                  className='form-control'
                  value={answers[question._id] || ''}
                  onChange={e =>
                    handleAnswerChange(question._id, e.target.value)
                  }
                />
              </div>
            )}
          </div>
        </div>
      ))}
      <div className='d-flex justify-content-between mt-3'>
        <button onClick={handleEditQuiz} className='btn btn-secondary'>
          Keep Editing This Quiz
        </button>
        {submitCount < 3 ? (
          <button onClick={handleSubmit} className='btn btn-danger'>
            Submit Quiz
          </button>
        ) : (
          <button onClick={handleRetakeQuiz} className='btn btn-warning'>
            You Can't Retake Quiz (Attempts left: 0)
          </button>
        )}
      </div>
    </div>
  )
}
