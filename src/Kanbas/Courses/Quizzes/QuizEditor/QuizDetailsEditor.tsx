import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as client from '../client'
import { addQuizzes, setQuizzes } from '../reducer'
import { MdDoNotDisturbAlt } from 'react-icons/md'
import RichTextEditor from '../../../RichTextEditor'

export default function QuizDetailsEditor () {
  const { cid, qid } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [quizDetails, setQuizDetails] = useState({
    title: '',
    instructions: '',
    quizType: 'graded',
    assignmentGroup: 'assignments',
    options: {
      shuffleAnswers: false,
      multipleAttempts: false,
      timeLimit: 0,
      showCorrectAnswers: false,
      oneQuestionAtATime: false,
      webcamRequired: false,
      lockAfterAnswering: false
    },
    accessCode: '',
    assignTo: '',
    dueDate: '',
    availableDate: '',
    untilDate: '',
    points: ''
  })

  const formatDate = (dateString: any) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const fetchQuizDetails = async () => {
    try {
      if (qid !== 'New') {
        const quiz = await client.findQuiz(cid as string, qid as string)
        setQuizDetails({
          title: quiz.title,
          instructions: quiz.instructions,
          quizType: quiz.quizType || 'graded',
          assignmentGroup: quiz.assignmentGroup || 'assignments',
          options: {
            shuffleAnswers: quiz.shuffleAnswers || false,
            multipleAttempts: quiz.multipleAttempts || false,
            timeLimit: quiz.timeLimit || 0,
            showCorrectAnswers: quiz.showCorrectAnswers || false,
            oneQuestionAtATime: quiz.oneQuestionAtATime || false,
            webcamRequired: quiz.webcamRequired || false,
            lockAfterAnswering: quiz.lockQuestionsAfterAnswering || false
          },
          accessCode: quiz.accessCode || '',
          assignTo: quiz.assignTo || '',
          dueDate: formatDate(quiz.dueDate),
          availableDate: formatDate(quiz.availableDate),
          untilDate: formatDate(quiz.untilDate),
          points: quiz.points || ''
        })
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error)
    }
  }

  useEffect(() => {
    fetchQuizDetails()
  }, [qid])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setQuizDetails({
      ...quizDetails,
      [name]: value
    })
  }

  const handleOptionsChange = (e: any) => {
    const { name, checked } = e.target
    setQuizDetails({
      ...quizDetails,
      options: {
        ...quizDetails.options,
        [name]: checked
      }
    })
  }

  const handleSave = async () => {
    try {
      if (qid !== 'New') {
        await client.updateQuiz({ ...quizDetails, _id: qid })
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)
      } else {
        console.log('Creating a new quiz')
        const newQuiz = await client.createQuizzes(
          cid as string,
          quizDetails as any
        )
        dispatch(addQuizzes(newQuiz))
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}`)
      }
    } catch (error) {
      console.error('Error saving quiz:', error)
    }
  }

  return (
    <div>
      <div className='container mt-5'>
        <div className='quiz-header d-flex justify-content-between align-items-center mb-4'>
          <div>
            <h1>Quiz Details Editor</h1>
          </div>
          <div className='quiz-meta d-flex'>
            <span className='quiz-points me-3'>
              Points {quizDetails.points}
            </span>
            <span className='quiz-published d-flex align-items-center'>
              <MdDoNotDisturbAlt className='me-2' />
              Not Published
            </span>
          </div>
        </div>
        <form>
          <div className='mb-3'>
            <label htmlFor='quiz-title' className='form-label'>
              Title
            </label>
            <input
              type='text'
              id='quiz-title'
              name='title'
              value={quizDetails.title}
              onChange={handleChange}
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='quiz-instructions' className='form-label'>
              Quiz Instructions:
            </label>
            <RichTextEditor
              value={quizDetails.instructions}
              onChange={content =>
                setQuizDetails({ ...quizDetails, instructions: content })
              }
            />
          </div>
          <div id='wd-quiz-details' className='text-nowrap'>
            <table className='table table-borderless'>
              <tbody>
                <tr>
                  <td align='right' valign='top'>
                    <label htmlFor='quiz-type' className='form-label'>
                      Quiz Type
                    </label>
                  </td>
                  <td>
                    <select
                      id='quiz-type'
                      name='quizType'
                      value={quizDetails.quizType}
                      onChange={handleChange}
                      className='form-control'
                    >
                      <option value='graded'>Graded Quiz</option>
                      <option value='practice'>Practice Quiz</option>
                      <option value='graded-survey'>Graded Survey</option>
                      <option value='ungraded-survey'>Ungraded Survey</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td align='right' valign='top'>
                    <label htmlFor='assignment-group' className='form-label'>
                      Assignment Group
                    </label>
                  </td>
                  <td>
                    <select
                      id='assignment-group'
                      name='assignmentGroup'
                      value={quizDetails.assignmentGroup}
                      onChange={handleChange}
                      className='form-control'
                    >
                      <option value='assignments'>Assignments</option>
                      <option value='quizzes'>Quizzes</option>
                      <option value='exams'>Exams</option>
                      <option value='projects'>Projects</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td colSpan={2}>
                    <h5>Options</h5>
                    <div className='mb-3 form-check'>
                      <input
                        type='checkbox'
                        id='shuffleAnswers'
                        name='shuffleAnswers'
                        checked={quizDetails.options.shuffleAnswers}
                        onChange={handleOptionsChange}
                        className='form-check-input'
                      />
                      <label
                        htmlFor='shuffleAnswers'
                        className='form-check-label'
                      >
                        Shuffle Answers
                      </label>
                      <br />
                      <input
                        type='checkbox'
                        id='multipleAttempts'
                        name='multipleAttempts'
                        checked={quizDetails.options.multipleAttempts}
                        onChange={handleOptionsChange}
                        className='form-check-input'
                      />
                      <label
                        htmlFor='multipleAttempts'
                        className='form-check-label'
                      >
                        Allow Multiple Attempts
                      </label>
                      <br />
                      <input
                        type='checkbox'
                        id='timeLimitCheckbox'
                        name='timeLimitCheckbox'
                        checked={!!quizDetails.options.timeLimit}
                        onChange={handleOptionsChange}
                        className='form-check-input'
                      />
                      <div className='d-flex me-3'>
                        <label
                          htmlFor='timeLimit'
                          className='form-check-label ms-2'
                        >
                          Time Limit (minutes)
                        </label>
                        <input
                          type='number'
                          id='timeLimit'
                          name='timeLimit'
                          value={quizDetails.options.timeLimit || ''}
                          onChange={handleChange}
                          className='form-control w-25 ms-2'
                        />
                      </div>
                      <input
                        type='checkbox'
                        id='showCorrectAnswers'
                        name='showCorrectAnswers'
                        checked={quizDetails.options.showCorrectAnswers}
                        onChange={handleOptionsChange}
                        className='form-check-input'
                      />
                      <label
                        htmlFor='showCorrectAnswers'
                        className='form-label'
                      >
                        Show Correct Answers
                      </label>
                      <br />
                      <input
                        type='checkbox'
                        id='oneQuestionAtATime'
                        name='oneQuestionAtATime'
                        checked={quizDetails.options.oneQuestionAtATime}
                        onChange={handleOptionsChange}
                        className='form-check-input'
                      />
                      <label
                        htmlFor='oneQuestionAtATime'
                        className='form-label'
                      >
                        One Question at a Time
                      </label>
                      <br />
                      <input
                        type='checkbox'
                        id='webcamRequired'
                        name='webcamRequired'
                        checked={quizDetails.options.webcamRequired}
                        onChange={handleOptionsChange}
                        className='form-check-input'
                      />
                      <label htmlFor='webcamRequired' className='form-label'>
                        Webcam Required
                      </label>
                      <br />
                      <input
                        type='checkbox'
                        id='lockAfterAnswering'
                        name='lockAfterAnswering'
                        checked={quizDetails.options.lockAfterAnswering}
                        onChange={handleOptionsChange}
                        className='form-check-input'
                      />
                      <label
                        htmlFor='lockAfterAnswering'
                        className='form-label'
                      >
                        Lock Questions After Answering
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align='right' valign='top'>
                    <label htmlFor='accessCode' className='form-label'>
                      Access Code
                    </label>
                  </td>
                  <td>
                    <input
                      type='text'
                      id='accessCode'
                      name='accessCode'
                      value={quizDetails.accessCode}
                      onChange={handleChange}
                      className='form-control'
                    />
                  </td>
                </tr>
                <tr>
                  <td align='right' valign='top'>
                    <label htmlFor='dueDate' className='form-label'>
                      Due Date
                    </label>
                  </td>
                  <td>
                    <input
                      type='datetime-local'
                      id='dueDate'
                      name='dueDate'
                      value={quizDetails.dueDate?.slice(0, 16)}
                      onChange={handleChange}
                      className='form-control'
                    />
                  </td>
                </tr>
                <tr>
                  <td align='right' valign='top'>
                    <label htmlFor='availableDate' className='form-label'>
                      Available From
                    </label>
                  </td>
                  <td>
                    <input
                      type='datetime-local'
                      id='availableDate'
                      name='availableDate'
                      value={quizDetails.availableDate?.slice(0, 16)}
                      onChange={handleChange}
                      className='form-control'
                    />
                  </td>
                </tr>
                <tr>
                  <td align='right' valign='top'>
                    <label htmlFor='untilDate' className='form-label'>
                      Until
                    </label>
                  </td>
                  <td>
                    <input
                      type='datetime-local'
                      id='untilDate'
                      name='untilDate'
                      value={quizDetails.untilDate?.slice(0, 16)}
                      onChange={handleChange}
                      className='form-control'
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='d-flex justify-content-end'>
            <button
              type='button'
              className='btn btn-secondary me-2'
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)}
            >
              Cancel
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
