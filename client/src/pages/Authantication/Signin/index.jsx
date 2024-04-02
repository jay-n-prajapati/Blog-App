import { PropTypes } from 'prop-types';
import Form from '@/components/common/Form';
import { Button } from '@/components/ui/button';
import InputWithLabel from '@/components/common/InputWithLabel';
import { useFormik } from 'formik';
import * as yup from 'yup';

const signinSchema = yup.object({
  email: yup.string().email().required('* email is required').trim(),
  password: yup.string().required('* required').trim(),
});

const Signin = ({ setContent }) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, handleReset } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: signinSchema,
      onSubmit: onSubmit,
    });
  function onSubmit() {
    console.log('submitted');
  }

  return (
    <>
    
      <div>
        <Form className='p-0 gap-0' handleSubmit={handleSubmit} handleReset={handleReset}>
          <div>
            <InputWithLabel
              label='Email'
              labelFor='email'
              type='email'
              value={values.email}
              placeholder='john@example.com'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email ? (
              <p className='text-left text-destructive text-[10px]'>{errors.email}</p>
            ) : (
              <p className='opacity-0 text-[10px]'>null</p>
            )}
          </div>
          <div>
            <InputWithLabel
              label='Password'
              labelFor='password'
              type='password'
              value={values.password}
              placeholder='John@123'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password ? (
              <p className='text-left text-destructive text-[10px]'>{errors.password}</p>
            ) : (
              <p className='opacity-0 text-[10px]'>null</p>
            )}
          </div>
          <div className='flex gap-2 mt-1'>
            <Button type='submit' className='text-[12px] md:text-sm'>SIGN IN</Button>
          </div>
        </Form>
      </div>
      <div className='flex items-center justify-center gap-1 text-primary-text text-[12px] md:text-sm'>
        <p>New to Blogify ? </p>
        <Button
          variant='link'
          className='text-primary h-0 p-0'
          onClick={() => setContent('signup')}
        >
          Sign Up
        </Button>
      </div>
    </>
  );
};

Signin.propTypes = {
  setContent: PropTypes.func,
};

export default Signin;
