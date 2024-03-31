import {PropTypes} from 'prop-types'

const Form = ({children , handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-4'>
      {children}
    </form>
  )
}

Form.propTypes = {
    children : PropTypes.node,
    handleSubmit : PropTypes.func
}

export default Form
