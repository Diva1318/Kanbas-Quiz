import { Link, useLocation } from 'react-router-dom'

export default function QuizEditor () {
  const location = useLocation()
  return (
    <ul className='nav nav-pills'>
      <li className='nav-item'>
        <Link
          id='wd-quiz-details'
          to='/Kanbas/Courses/:cid/Quizzes/QuizEditor/QuizDetails'
          className={`nav-link ${
            location.pathname.includes('QuizDetails') ? 'active' : ''
          }`}
        >
          Details
        </Link>
      </li>
      <li className='nav-item'>
        <Link
          id='wd-quiz-questions'
          to='/Kanbas/Courses/:cid/Quizzes/QuizEditor/Questions'
          className={`nav-link ${
            location.pathname.includes('QuizQuestionEditor') ? 'active' : ''
          }`}
        >
          Questions
        </Link>
      </li>
    </ul>
  )
}
