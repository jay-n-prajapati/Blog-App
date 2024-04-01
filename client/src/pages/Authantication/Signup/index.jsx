import { PropTypes } from 'prop-types';
import Form from '@/components/common/Form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputWithLabel from '@/components/common/InputWithLabel';
import * as yup from 'yup'

const signUpSchema = yup.object({
  
})


const Signup = ({ setContent }) => {
  return (
    <>
      <div>
        <Form className='p-0'>
          <div>
            <InputWithLabel label='Name' labelFor='name' type='text' placeholder='John Doe' />
          </div>
          <div>
            <InputWithLabel
              label='Email'
              labelFor='email'
              type='email'
              placeholder='john@example.com'
            />
          </div>
          <div>
            <InputWithLabel
              label='Password'
              labelFor='password'
              type='password'
              placeholder='John@123'
            />
          </div>
          <div>
            <InputWithLabel
              label='Confirm Password'
              labelFor='cpassword'
              type='text'
              placeholder='John@123'
            />
          </div>
          <div className='flex gap-2'>
            <Button>SIGN UP</Button>
          </div>
        </Form>
      </div>
      <div className='flex items-center justify-center gap-1 text-primary-text text-sm'>
        <p>Already have an account ?</p>
        <Button
          variant='link'
          className='text-primary h-0 p-0'
          onClick={() => setContent('signin')}
        >
          Sign In
        </Button>
      </div>
    </>
  );
};

Signup.propTypes = {
  setContent: PropTypes.func,
};

export default Signup;
