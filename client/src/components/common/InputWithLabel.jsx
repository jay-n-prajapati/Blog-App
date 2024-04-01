import { PropTypes } from 'prop-types';
import { Input } from '../ui/input';

const InputWithLabel = ({
  label,
  labelFor,
  type,
  onChange,
  placeholder,
  labelClass,
  inputClass,
  ...props
}) => {
  return (
    <>
      <div className={`flex gap-1 flex-col ${labelClass}`}>
        {label && (
          <label htmlFor={labelFor} className='text-primary-text text-sm'>
            {label}
          </label>
        )}
        <Input
          className={`text-sm ${inputClass}`}
          id={labelFor}
          name = {labelFor}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </>
  );
};

InputWithLabel.propTypes = {
  label: PropTypes.string,
  labelFor: PropTypes.string,
  placeholder: PropTypes.string,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  // props : PropTypes.any
};

export default InputWithLabel;
