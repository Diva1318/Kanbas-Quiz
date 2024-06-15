import { MdOutlineModeEditOutline } from 'react-icons/md'
import './style.css'
export default function Quizzes () {
  return (
    <div id='wd-quizzes'>
      <div
        id='wd-quiz-control-buttons'
        className='text-nowrap align-self-center'
      >
        <button
          id='wd-preview-btn'
          className='btn btn-lg btn-secondary me-1  text-center'
        >
          Preview
        </button>
        <button
          id='wd-quiz-edit-btn'
          className='btn btn-lg btn-secondary me-1 text-center'
        >
          <MdOutlineModeEditOutline />
          Edit
        </button>
      </div>
      <br />
      <hr />
      <div id='wd-quiz-details' className='text-nowrap'>
        <h1>Q1-HTML</h1>
        <div className='table-responsive custon-quiz-table'>
          <table className='table table-borderless '>
            <tbody>
              <tr>
                <th>Quiz Type</th>
                <td>Graded Quiz</td>
              </tr>
              <tr>
                <th>Points</th>
                <td>29</td>
              </tr>
              <tr>
                <th>Assignment Group</th>
                <td>Quizzes</td>
              </tr>
              <tr>
                <th>Shuffle Answers</th>
                <td>No</td>
              </tr>
              <tr>
                <th>Time Limit</th>
                <td>30 Minutes</td>
              </tr>
              <tr>
                <th>Multiple Attempts</th>
                <td>No</td>
              </tr>
              <tr>
                <th>View Responses</th>
                <td>Always</td>
              </tr>
              <tr>
                <th>Show Correct Answers</th>
                <td>Immediately</td>
              </tr>
              <tr>
                <th>One Question at a Time</th>
                <td>Yes</td>
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
                <td>No</td>
              </tr>
              <tr>
                <th>Lock Questions After Answering</th>
                <td>No</td>
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
                <td>Sep 21 at 1 pm</td>
                <td>Everyone</td>
                <td>Sep 21 at 11:40 am</td>
                <td>Sep 21 at 1 pm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
