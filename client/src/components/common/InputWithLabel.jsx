import PropTypes from 'prop-types';
import { Input } from '../ui/input';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { useState } from 'react';

const InputWithLabel = ({
  value,
  label,
  labelFor,
  type='text',
  onChange,
  onBlur,
  placeholder,
  labelClass,
  inputClass,
  ...props
}) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <>
      <div className={`flex gap-1 flex-col ${labelClass}`}>
        {label && (
          <label htmlFor={labelFor} className={`text-primary-text text-[12px] md:text-sm text-left ${labelClass}`}>
            {label}
          </label>
        )}
        <div className='flex items-center relative'>
          <Input
            className={` text-[12px] md:text-sm ${inputClass}`}
            id={labelFor}
            name={labelFor}
            type={type === 'password' ? (showPass ? 'text' : 'password') : type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur ={onBlur}
            required
          />
          {type === 'password' ? (
            showPass ? (
              <EyeOff
                className='absolute right-2 text-primary-text text-[12px] md:text-sm'
                onClick={() => setShowPass(!showPass)}
              />
            ) : (
              <Eye
                className='absolute right-2 text-primary-text text-[12px] md:text-sm'
                onClick={() => setShowPass(!showPass)}
              />
            )
          ) : null}
        </div>
      </div>
    </>
  );
};

InputWithLabel.propTypes = {
  label: PropTypes.string,
  labelFor: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default InputWithLabel;
