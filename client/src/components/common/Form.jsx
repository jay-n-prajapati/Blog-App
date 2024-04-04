import PropTypes from 'prop-types'

const Form = ({className, children , handleSubmit , handleReset }) => {
  return (
    <form onSubmit={handleSubmit} onReset={handleReset} className={`p-4 flex flex-col gap-1 ${className}`}>
      {children}
    </form>
  )
}

Form.propTypes = {
    className : PropTypes.string,
    children : PropTypes.node,
    handleSubmit : PropTypes.func,
    handleReset : PropTypes.func
}

export default Form
