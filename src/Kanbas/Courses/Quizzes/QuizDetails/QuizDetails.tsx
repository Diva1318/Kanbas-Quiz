import { MdOutlineModeEditOutline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import './index.css'
import * as client from '../client'
import { setQuizzes } from '../reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export default function QuizDetails () {
  const { cid, qid } = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchQuiz = async () => {
    try {
      if (qid !== 'New') {
        const quiz = await client.findQuiz(cid as string, qid as string)
        dispatch(setQuizzes([quiz]))
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuiz()
 
  }, [cid, qid])

  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  )



  return (
    <div id='wd-quizzes'>
      <div
        id='wd-quiz-control-buttons'
        className='text-nowrap align-self-center'
      >
        <button
          id='wd-preview-btn'
          className='btn btn-lg btn-secondary me-1 text-center'
        >
          Preview
        </button>
        <Link
          id='wd-quiz-edit-btn'
          className='btn btn-lg btn-secondary me-1 text-center'
          to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`}
        >
          <MdOutlineModeEditOutline />
          Edit
        </Link>
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
              <tr>
                <th>View Responses</th>
                <td>Always</td>
              </tr>
              <tr>
                <th>Show Correct Answers</th>
                <td>{quiz.showCorrectAnswers}</td>
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
                <td>{quiz.dueDate}</td>
                <td>Everyone</td>
                <td>{quiz.availableDate}</td>
                <td>{quiz.untilDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
