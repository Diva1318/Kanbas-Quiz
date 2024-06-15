import { Navigate, Routes, Route } from 'react-router'
import QuizDetailsEditor from './QuizEditor/QuizDetailsEditor'
import QuizQuestionEditor from './QuizEditor/QuestionsEditor'

export default function QuizEditorTOC () {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='QuizDetails' />} />
      <Route path='QuizEditor/QuizDetails' element={<QuizDetailsEditor />} />
      <Route path='Questions' element={<QuizQuestionEditor />} />
    </Routes>
  )
}
