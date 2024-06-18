import { Link, useLocation, Routes, Route } from 'react-router-dom'
import QuizDetailsEditor from './QuizDetailsEditor'
import QuizQuestionEditor from './QuestionsEditor'

export default function QuizEditor () {
  const location = useLocation()

  return (
    <div>
      <ul className='nav nav-pills'>
        <li className='nav-item'>
          <Link
            to='details'
            className={`nav-link ${
              location.pathname.includes('details') ? 'active' : ''
            }`}
          >
            Details
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='questions'
            className={`nav-link ${
              location.pathname.includes('questions') ? 'active' : ''
            }`}
          >
            Questions
          </Link>
        </li>
      </ul>

      <Routes>
        <Route path='details' element={<QuizDetailsEditor />} />
        <Route path='questions' element={<QuizQuestionEditor />} />
      </Routes>
    </div>
  )
}
