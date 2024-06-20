import RichTextEditor from '../../../../RichTextEditor'

export default function QuizEditorTOC () {
  return (
    <div>
      <p>
        Enter your question text, then select True or False is the correct
        answer
      </p>
      <div className='mb-3'>
        <label htmlFor='question' className='form-label'>
          <strong>Question:</strong>
        </label>
        {/* <textarea id='question' className='form-control' /> */}
        <RichTextEditor value={''} onChange={function (value: string): void {
          throw new Error('Function not implemented.')
        } } />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Answers:</label>
        <div className='form-check'>
          <input
            type='radio'
            id='true'
            name='answer'
            className='form-check-input'
          />
          <label htmlFor='true' className='form-check-label'>
            True
          </label>
        </div>
        <div className='form-check'>
          <input
            type='radio'
            id='false'
            name='answer'
            className='form-check-input'
          />
          <label htmlFor='false' className='form-check-label'>
            False
          </label>
        </div>
      </div>
    </div>
  )
}
