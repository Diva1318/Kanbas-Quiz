// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate, useParams } from 'react-router-dom'
// import * as questionClient from './QuestionClient'
// import * as quizClient from './client'
// import { setQuestions as setQuestionsAction } from './QuestionsReducer'
// import './style.css'

// interface Question {
//   title: string
//   _id: string
//   text: string
//   points: number
//   type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false'
//   options?: string[]
//   answers: string[]
// }

// interface Answers {
//   [key: string]: string
// }

// interface Quiz {
//   title: string
//   multipleAttempts: boolean
//   numberOfAttempts: number
// }

// export default function QuizPreview () {
//   const { cid, qid } = useParams()
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const [answers, setAnswers] = useState<Answers>({})
//   const [score, setScore] = useState<number | null>(null)
//   const [incorrectQuestions, setIncorrectQuestions] = useState<string[]>([])
//   const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null)
//   const [quizDetails, setQuizDetails] = useState<Quiz | null>(null)
//   const [submitCount, setSubmitCount] = useState<number>(0)
//   const [timeLeft, setTimeLeft] = useState<number>(60) // Timer set to 1 minute
//   const [timer, setTimer] = useState<NodeJS.Timeout | null>(null) // Timer reference
//   const [scores, setScores] = useState<number[]>([]) // Scores for each attempt

//   const { currentUser } = useSelector((state: any) => state.accountReducer)

//   const questions = useSelector((state: any) =>
//     state.questionsReducer.questions.filter(
//       (question: any) => question.quiz === qid
//     )
//   )

//   const fetchQuestions = async () => {
//     try {
//       const fetchedQuestions = await questionClient.findAllQuestionsByQuizId(
//         qid as string
//       )
//       const questionsWithOptions = fetchedQuestions.map(
//         (question: Question) => {
//           if (
//             question.type === 'true-false' &&
//             (!question.options || question.options.length === 0)
//           ) {
//             return { ...question, options: ['True', 'False'] }
//           }
//           return question
//         }
//       )
//       dispatch(setQuestionsAction(questionsWithOptions))
//     } catch (error) {
//       console.error('Error fetching questions:', error)
//     }
//   }

//   const fetchQuizDetails = async () => {
//     try {
//       const fetchedQuizDetails = await quizClient.findQuiz(
//         cid as string,
//         qid as string
//       )
//       setQuizDetails(fetchedQuizDetails)
//       if (fetchedQuizDetails.multipleAttempts) {
//         const savedAttemptsLeft = localStorage.getItem(
//           `quiz-${qid}-attemptsLeft`
//         )
//         setAttemptsLeft(
//           savedAttemptsLeft
//             ? parseInt(savedAttemptsLeft)
//             : fetchedQuizDetails.numberOfAttempts
//         )
//       } else {
//         setAttemptsLeft(1)
//       }
//     } catch (error) {
//       console.error('Error fetching quiz details:', error)
//     }
//   }

//   useEffect(() => {
//     fetchQuestions()
//     fetchQuizDetails()
//   }, [qid])

//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timerInterval = setInterval(() => {
//         setTimeLeft(prevTime => prevTime - 1)
//       }, 1000)
//       setTimer(timerInterval)
//       return () => clearInterval(timerInterval)
//     } else {
//       handleSubmit()
//     }
//   }, [timeLeft])

//   const handleAnswerChange = (questionId: string, answer: string) => {
//     setAnswers({
//       ...answers,
//       [questionId]: answer
//     })
//   }

//   const handleSubmit = () => {
//     let newScore = 0
//     const incorrect = [] as any
//     questions.forEach((question: Question) => {
//       if (answers[question._id] === question.answers[0]) {
//         newScore += question.points
//       } else {
//         incorrect.push(question._id)
//       }
//     })
//     setScore(newScore)
//     setScores([...scores, newScore]) // Store the new score
//     setIncorrectQuestions(incorrect)
//     window.scrollTo({ top: 0, behavior: 'smooth' })

//     if (quizDetails?.multipleAttempts) {
//       setAttemptsLeft(prev => {
//         const newAttemptsLeft = prev !== null ? prev - 1 : null
//         localStorage.setItem(
//           `quiz-${qid}-attemptsLeft`,
//           newAttemptsLeft?.toString() || '0'
//         )
//         return newAttemptsLeft
//       })
//     } else {
//       setAttemptsLeft(0)
//     }

//     setSubmitCount(prevCount => prevCount + 1)
//     console.log('Quiz submitted successfully:', answers, 'Score:', newScore)

//     // Stop the timer
//     if (timer) {
//       clearInterval(timer)
//       setTimer(null)
//     }

//     // Restart the timer
//     setTimeLeft(60)
//   }

//   const handleRetakeQuiz = () => {
//     setAnswers({})
//     setScore(null)
//     setIncorrectQuestions([])
//   }

//   const getScoreComment = (percentage: number) => {
//     if (percentage === 100) {
//       return "Perfect score! You're a genius!"
//     } else if (percentage >= 75) {
//       return 'Great job! Almost perfect!'
//     } else if (percentage >= 50) {
//       return "Not bad! You're getting there!"
//     } else if (percentage >= 25) {
//       return 'You can do better! Keep trying!'
//     } else {
//       return 'Well, at least you tried. Better luck next time!'
//     }
//   }

//   const handleEditQuiz = () => {
//     navigate(`/Kanbas/Courses/${cid}/QuizDetailsEditor`)
//   }

//   const totalPoints = questions.reduce(
//     (acc: number, q: Question) => acc + q.points,
//     0
//   )
//   const percentageScore = score !== null ? (score / totalPoints) * 100 : 0
//   const scoreComment = getScoreComment(percentageScore)

//   return (
//     <div className='container mt-5'>
//       {score !== null && (
//         <div className='mt-4'>
//           <div className='card text-center'>
//             <div className='card-header'>
//               <h3 className='card-title'>Total Score</h3>
//             </div>
//             <div className='card-body'>
//               <h1 className='display-4'>{score}</h1>
//               <p className='card-text'>
//                 You scored {score} points out of a possible {totalPoints}.<br />
//               </p>
//             </div>
//             <div className='card-footer text-muted'>{scoreComment}</div>
//           </div>
//         </div>
//       )}
//       <h1>{quizDetails?.title}</h1>
//       <div className='alert alert-info' role='alert'>
//         Time left: {Math.floor(timeLeft / 60)}:
//         {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
//       </div>
//       {quizDetails?.multipleAttempts ? (
//         attemptsLeft !== null && attemptsLeft > 0 ? (
//           <div className='alert alert-warning' role='alert'>
//             This quiz allows multiple attempts. Attempts left: {attemptsLeft}
//           </div>
//         ) : (
//           <div className='alert alert-warning' role='alert'>
//             Unable to retake the quiz. You have used all your attempts.
//           </div>
//         )
//       ) : (
//         <div className='alert alert-warning' role='alert'>
//           You are only allowed to take this quiz once.
//         </div>
//       )}
//       {currentUser?.role !== 'STUDENT' && (
//         <div className='alert alert-info' role='alert'>
//           This is a preview of the published version of the quiz.
//         </div>
//       )}
//       <h2>Quiz Instructions</h2>
//       {questions.map((question: Question, index: number) => (
//         <div
//           key={question._id}
//           className={`card mb-3 ${
//             incorrectQuestions.includes(question._id) ? 'border-danger' : ''
//           }`}
//         >
//           <div className='card-header d-flex justify-content-between'>
//             <h3>Question {index + 1}</h3>
//             <span>{question.points} pts</span>
//           </div>
//           <div className='card-body'>
//             <h4>{question.title}</h4>
//             <p>{question.text}</p>
//             {question.type === 'multiple-choice' && (
//               <div className='list-group'>
//                 {question.options?.map(option => (
//                   <label
//                     key={option}
//                     className='list-group-item d-flex align-items-center'
//                   >
//                     <input
//                       type='radio'
//                       name={`question-${question._id}`}
//                       value={option}
//                       checked={answers[question._id] === option}
//                       onChange={() => handleAnswerChange(question._id, option)}
//                       className='me-2'
//                     />
//                     {option}
//                   </label>
//                 ))}
//               </div>
//             )}
//             {question.type === 'true-false' && (
//               <div className='list-group'>
//                 {question.options?.map(option => (
//                   <label
//                     key={option}
//                     className='list-group-item d-flex align-items-center'
//                   >
//                     <input
//                       type='radio'
//                       name={`question-${question._id}`}
//                       value={option}
//                       checked={answers[question._id] === option}
//                       onChange={() => handleAnswerChange(question._id, option)}
//                       className='me-2'
//                     />
//                     {option}
//                   </label>
//                 ))}
//               </div>
//             )}
//             {question.type === 'fill-in-the-blank' && (
//               <div className='mb-3'>
//                 <input
//                   type='text'
//                   className='form-control'
//                   value={answers[question._id] || ''}
//                   onChange={e =>
//                     handleAnswerChange(question._id, e.target.value)
//                   }
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//       <div className='d-flex justify-content-between mt-3'>
//         {currentUser?.role !== 'STUDENT' && (
//           <button onClick={handleEditQuiz} className='btn btn-secondary'>
//             Keep Editing This Quiz
//           </button>
//         )}
//         {submitCount < (quizDetails?.numberOfAttempts || 1) && timeLeft > 0 ? (
//           <button onClick={handleSubmit} className='btn btn-danger'>
//             Submit Quiz
//           </button>
//         ) : (
//           <button
//             onClick={handleRetakeQuiz}
//             className='btn btn-warning'
//             disabled
//           >
//             You Can't Retake Quiz (Attempts left: 0)
//           </button>
//         )}
//       </div>
//       {scores.length > 0 && (
//         <div className='mt-5'>
//           <h3>Scores for Each Attempt</h3>
//           <ul className='list-group'>
//             {scores.map((score, index) => (
//               <li key={index} className='list-group-item'>
//                 Attempt {index + 1}: {score} points
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   )
// }
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
  attemptsAllowed: number
}

export default function QuizPreview () {
  const { cid, qid } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [answers, setAnswers] = useState<Answers>({})
  const [score, setScore] = useState<number | null>(null)
  const [incorrectQuestions, setIncorrectQuestions] = useState<string[]>([])
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null)
  const [quizDetails, setQuizDetails] = useState<Quiz | null>(null)
  const [submitCount, setSubmitCount] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(60) // Timer set to 1 minute
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null) // Timer reference
  const [scores, setScores] = useState<number[]>([]) // Scores for each attempt

  const { currentUser } = useSelector((state: any) => state.accountReducer)

  const questions = useSelector((state: any) =>
    state.questionsReducer.questions.filter(
      (question: any) => question.quiz === qid
    )
  )

  const fetchQuestions = async () => {
    try {
      const fetchedQuestions = await questionClient.findAllQuestionsByQuizId(
        qid as string
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
        qid as string
      )
      setQuizDetails(fetchedQuizDetails)
      if (fetchedQuizDetails.multipleAttempts) {
        const savedAttemptsLeft = localStorage.getItem(
          `quiz-${qid}-attemptsLeft`
        )
        setAttemptsLeft(
          savedAttemptsLeft
            ? parseInt(savedAttemptsLeft)
            : fetchedQuizDetails.attemptsAllowed
        )
      } else {
        setAttemptsLeft(1)
      }
    } catch (error) {
      console.error('Error fetching quiz details:', error)
    }
  }

  useEffect(() => {
    fetchQuestions()
    fetchQuizDetails()
  }, [qid])

  useEffect(() => {
    if (timeLeft > 0) {
      const timerInterval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1)
      }, 1000)
      setTimer(timerInterval)
      return () => clearInterval(timerInterval)
    } else {
      handleSubmit()
    }
  }, [timeLeft])

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
    setScores([...scores, newScore]) // Store the new score
    setIncorrectQuestions(incorrect)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    if (quizDetails?.multipleAttempts) {
      setAttemptsLeft(prev => {
        const newAttemptsLeft = prev !== null ? prev - 1 : null
        localStorage.setItem(
          `quiz-${qid}-attemptsLeft`,
          newAttemptsLeft?.toString() || '0'
        )
        return newAttemptsLeft
      })
    } else {
      setAttemptsLeft(0)
    }

    setSubmitCount(prevCount => prevCount + 1)
    console.log('Quiz submitted successfully:', answers, 'Score:', newScore)

    // Stop the timer
    if (timer) {
      clearInterval(timer)
      setTimer(null)
    }

    // Restart the timer
    setTimeLeft(60)
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
    navigate(`/Kanbas/Courses/${cid}/QuizDetailsEditor`)
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
      <h1>{quizDetails?.title}</h1>
      <div className='alert alert-info' role='alert'>
        Time left: {Math.floor(timeLeft / 60)}:
        {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
      </div>
      {quizDetails?.multipleAttempts ? (
        attemptsLeft !== null && attemptsLeft > 0 ? (
          <div className='alert alert-warning' role='alert'>
            This quiz allows multiple attempts. Attempts left: {attemptsLeft}
          </div>
        ) : (
          <div className='alert alert-warning' role='alert'>
            Unable to retake the quiz. You have used all your attempts.
          </div>
        )
      ) : (
        <div className='alert alert-warning' role='alert'>
          You are only allowed to take this quiz once.
        </div>
      )}
      {currentUser?.role !== 'STUDENT' && (
        <div className='alert alert-info' role='alert'>
          This is a preview of the published version of the quiz.
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
        {currentUser?.role !== 'STUDENT' && (
          <button onClick={handleEditQuiz} className='btn btn-secondary'>
            Keep Editing This Quiz
          </button>
        )}
        {submitCount < (quizDetails?.attemptsAllowed || 1) && timeLeft > 0 ? (
          <button onClick={handleSubmit} className='btn btn-danger'>
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={handleRetakeQuiz}
            className='btn btn-warning'
            disabled
          >
            You Can't Retake Quiz (Attempts left: 0)
          </button>
        )}
      </div>
      {scores.length > 0 && (
        <div className='mt-5'>
          <h3>Scores for Each Attempt</h3>
          <ul className='list-group'>
            {scores
              .slice(0, quizDetails?.attemptsAllowed || 1)
              .map((score, index) => (
                <li key={index} className='list-group-item'>
                  Attempt {index + 1}: {score} points
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}
