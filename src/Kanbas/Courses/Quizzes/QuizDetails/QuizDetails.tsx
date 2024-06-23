// import { MdOutlineModeEditOutline } from 'react-icons/md'
// import { Link, useParams } from 'react-router-dom'
// import './index.css'
// import * as client from '../client'
// import { setQuizzes } from '../reducer'
// import { useDispatch, useSelector } from 'react-redux'
// import { useEffect, useState } from 'react'
// import { format } from 'date-fns'
// import { AiOutlineStop } from 'react-icons/ai'
// import { FaPlus } from 'react-icons/fa6'

// export default function QuizDetails () {
//   const { cid, qid } = useParams()
//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   const fetchQuiz = async () => {
//     try {
//       if (qid !== 'New') {
//         const quiz = await client.findQuiz(cid as string, qid as string)
//         console.log('Fetched quiz:', quiz) // Debug log
//         dispatch(setQuizzes([quiz]))
//       }
//     } catch (err: any) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const togglePublish = async () => {
//     if (!quiz) return

//     const updatedQuiz = { ...quiz, published: !quiz.published }
//     try {
//       await client.updateQuiz(updatedQuiz)
//       dispatch(setQuizzes([updatedQuiz]))
//     } catch (err: any) {
//       setError(err.message)
//     }
//   }

//   useEffect(() => {
//     fetchQuiz()
//   }, [cid, qid])

//   const quiz = useSelector((state: any) =>
//     state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
//   )

//   const formatDate = (dateString: string) => {
//     try {
//       const date = new Date(dateString)
//       return format(date, "MMM d 'at' h a")
//     } catch (error) {
//       console.error('Error formatting date:', error)
//       return dateString
//     }
//   }

//   console.log('Quiz from state:', quiz) // Debug log
//   const { currentUser } = useSelector((state: any) => state.accountReducer)
//   console.log('USER ' + currentUser.role)

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   if (error) {
//     return <div>Error: {error}</div>
//   }

//   if (!quiz) {
//     return <div>No quiz found</div>
//   }

//   if (!currentUser) {
//     return <div>No user logged in</div>
//   }

//   return (
//     <div id='wd-quizzes'>
//       <div
//         id='wd-quiz-control-buttons'
//         className='text-nowrap align-self-center'
//       >
//         {currentUser.role === 'STUDENT' ? (
//           <Link
//             id='wd-take-quiz-btn'
//             className='btn btn-lg btn-primary me-1 text-center'
//             to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`}
//           >
//             Take Quiz
//           </Link>
//         ) : (
//           <>
//             <button
//               id='wd-publish-btn'
//               className={`btn btn-lg me-1 ${
//                 quiz.published ? 'btn-success' : 'btn-danger'
//               }`}
//               onClick={togglePublish}
//             >
//               {quiz.published ? <FaPlus /> : <AiOutlineStop />}
//               {quiz.published ? ' Published' : ' Unpublished'}
//             </button>
//             <Link
//               id='wd-preview-btn'
//               className='btn btn-lg btn-secondary me-1 text-center'
//               to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`}
//             >
//               Preview
//             </Link>
//             <Link
//               id='wd-quiz-edit-btn'
//               className='btn btn-lg btn-secondary me-1 text-center'
//               to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`}
//             >
//               <MdOutlineModeEditOutline />
//               Edit
//             </Link>
//           </>
//         )}
//       </div>
//       <br />
//       <hr />
//       <div id='wd-quiz-details' className='text-nowrap'>
//         <h1>{quiz.title}</h1>
//         <div className='table-responsive custon-quiz-table'>
//           <table className='table table-borderless'>
//             <tbody>
//               <tr>
//                 <th>Quiz Type</th>
//                 <td>{quiz.quizType}</td>
//               </tr>
//               <tr>
//                 <th>Points</th>
//                 <td>{quiz.points}</td>
//               </tr>
//               <tr>
//                 <th>Assignment Group</th>
//                 <td>{quiz.assignmentGroup}</td>
//               </tr>
//               <tr>
//                 <th>Shuffle Answers</th>
//                 <td>{quiz.shuffleAnswers ? 'Yes' : 'No'}</td>
//               </tr>
//               <tr>
//                 <th>Time Limit</th>
//                 <td>{quiz.timeLimit}</td>
//               </tr>
//               <tr>
//                 <th>Multiple Attempts</th>
//                 <td>{quiz.multipleAttempts ? 'Yes' : 'No'}</td>
//               </tr>
//               {quiz.multipleAttempts && (
//                 <tr>
//                   <th>Attempts Allowed</th>
//                   <td>{quiz.attempts}</td>
//                 </tr>
//               )}
//               <tr>
//                 <th>View Responses</th>
//                 <td>Always</td>
//               </tr>
//               <tr>
//                 <th>Show Correct Answers</th>
//                 <td>{quiz.showCorrectAnswers ? 'Yes' : 'No'}</td>
//               </tr>
//               <tr>
//                 <th>One Question at a Time</th>
//                 <td>{quiz.oneQuestionAtATime ? 'Yes' : 'No'}</td>
//               </tr>
//               <tr>
//                 <th>Require Respondus Lockdown Browser</th>
//                 <td>No</td>
//               </tr>
//               <tr>
//                 <th>Required to View Quiz Results</th>
//                 <td>No</td>
//               </tr>
//               <tr>
//                 <th>Webcam Required</th>
//                 <td>{quiz.webcamRequired ? 'Yes' : 'No'}</td>
//               </tr>
//               <tr>
//                 <th>Lock Questions After Answering</th>
//                 <td>{quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div className='table-responsive'>
//           <table className='table'>
//             <thead>
//               <tr>
//                 <th>Due</th>
//                 <th>For</th>
//                 <th>Available From</th>
//                 <th>Until</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{formatDate(quiz.dueDate)}</td>
//                 <td>Everyone</td>
//                 <td>{formatDate(quiz.availableDate)}</td>
//                 <td>{formatDate(quiz.untilDate)}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './index.css'
import * as client from '../client'
import { setQuizzes } from '../reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { AiOutlineStop } from 'react-icons/ai'
import { FaPlus, FaArrowLeft } from 'react-icons/fa6'

export default function QuizDetails () {
  const { cid, qid } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchQuiz = async () => {
    try {
      if (qid !== 'New') {
        const quiz = await client.findQuiz(cid as string, qid as string)
        console.log('Fetched quiz:', quiz) // Debug log
        dispatch(setQuizzes([quiz]))
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const togglePublish = async () => {
    if (!quiz) return

    const updatedQuiz = { ...quiz, published: !quiz.published }
    try {
      await client.updateQuiz(updatedQuiz)
      dispatch(setQuizzes([updatedQuiz]))
    } catch (err: any) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchQuiz()
  }, [cid, qid])

  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  )

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, "MMM d 'at' h a")
    } catch (error) {
      console.error('Error formatting date:', error)
      return dateString
    }
  }

  console.log('Quiz from state:', quiz) // Debug log
  const { currentUser } = useSelector((state: any) => state.accountReducer)
  console.log('USER ' + currentUser.role)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!quiz) {
    return <div>No quiz found</div>
  }

  if (!currentUser) {
    return <div>No user logged in</div>
  }

  return (
    <div id='wd-quizzes'>
      <button className='btn btn-secondary mb-3' onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/`)}>
        <FaArrowLeft /> Go Back
      </button>
      <div
        id='wd-quiz-control-buttons'
        className='text-nowrap align-self-center'
      >
        {currentUser.role === 'STUDENT' ? (
          <Link
            id='wd-take-quiz-btn'
            className='btn btn-lg btn-primary me-1 text-center'
            to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`}
          >
            Take Quiz
          </Link>
        ) : (
          <>
            <button
              id='wd-publish-btn'
              className={`btn btn-lg me-1 ${
                quiz.published ? 'btn-success' : 'btn-danger'
              }`}
              onClick={togglePublish}
            >
              {quiz.published ? <FaPlus /> : <AiOutlineStop />}
              {quiz.published ? ' Published' : ' Unpublished'}
            </button>
            <Link
              id='wd-preview-btn'
              className='btn btn-lg btn-secondary me-1 text-center'
              to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`}
            >
              Preview
            </Link>
            <Link
              id='wd-quiz-edit-btn'
              className='btn btn-lg btn-secondary me-1 text-center'
              to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`}
            >
              <MdOutlineModeEditOutline />
              Edit
            </Link>
          </>
        )}
      </div>
      <br />
      <hr />
      <div id='wd-quiz-details' className='text-nowrap'>
        <h1>{quiz.title}</h1>
        <div className='table-responsive custon-quiz-table'>
          <table className='table table-borderless'>
            <tbody>
              <tr>
                <th>Quiz Type</th>
                <td>{quiz.quizType}</td>
              </tr>
              <tr>
                <th>Points</th>
                <td>{quiz.points}</td>
              </tr>
              <tr>
                <th>Assignment Group</th>
                <td>{quiz.assignmentGroup}</td>
              </tr>
              <tr>
                <th>Shuffle Answers</th>
                <td>{quiz.shuffleAnswers ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <th>Time Limit</th>
                <td>{quiz.timeLimit}</td>
              </tr>
              <tr>
                <th>Multiple Attempts</th>
                <td>{quiz.multipleAttempts ? 'Yes' : 'No'}</td>
              </tr>
              {quiz.multipleAttempts && (
                <tr>
                  <th>Attempts Allowed</th>
                  <td>{quiz.attempts}</td>
                </tr>
              )}
              <tr>
                <th>View Responses</th>
                <td>Always</td>
              </tr>
              <tr>
                <th>Show Correct Answers</th>
                <td>{quiz.showCorrectAnswers ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <th>One Question at a Time</th>
                <td>{quiz.oneQuestionAtATime ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <th>Require Respondus Lockdown Browser</th>
                <td>No</td>
              </tr>
              <tr>
                <th>Required to View Quiz Results</th>
                <td>No</td>
              </tr>
              <tr>
                <th>Webcam Required</th>
                <td>{quiz.webcamRequired ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <th>Lock Questions After Answering</th>
                <td>{quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>Due</th>
                <th>For</th>
                <th>Available From</th>
                <th>Until</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{formatDate(quiz.dueDate)}</td>
                <td>Everyone</td>
                <td>{formatDate(quiz.availableDate)}</td>
                <td>{formatDate(quiz.untilDate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
