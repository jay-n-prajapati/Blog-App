import PropTypes from 'prop-types';
import Form from '@/components/common/Form';
import { Button } from '@/components/ui/button';
import InputWithLabel from '@/components/common/InputWithLabel';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { findUser} from '@/utils/axios-instance';
import { toast } from 'react-toastify';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { setAuth } from '@/redux/actions/authActions';
import { setLoader } from '@/redux/actions/appActions';
import { Loader2 } from 'lucide-react';
import HelmetHeader from '@/components/common/HelmetHeader';

const signinSchema = yup.object({
  email: yup.string().email().required('* email is required').trim(),
  password: yup.string().required('* required').trim(),
});
const options = [
  { label: 'User', value: 'user' },
  { label: 'Admin', value: 'admin' },
  { label: 'Sub admin', value: 'subAdmin' },
];

const Signin = ({ setContent }) => {

  const [role, setRole] = useState('');
  const { loader } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, handleReset } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: signinSchema,
      onSubmit: onSubmit,
    });

  async function onSubmit() {
    if (role === 'user') {
      dispatch(setLoader(true));
      const {data:user} = await findUser('users', values.email);
      console.log(user);
      if (user.length === 0) {
        toast.warn('User Not exist , Please Signup');
        handleReset();
        dispatch(setLoader(false));
        return;
      } else if (user[0].password === values.password) {
        dispatch(setAuth(role, user[0]));
        toast.success(`${role} logged in successfully`);
        navigate('/home');
      } else {
        toast.error('Invalid Credentials , Try Again');
      }
      dispatch(setLoader(false));
    }

    if (role === 'subAdmin') {
      dispatch(setLoader(true));
      const {data:subAdmin} = await findUser('subAdmins', values.email);
      if (subAdmin.length === 0) {
        toast.warn('User Not exist');
        handleReset();
        dispatch(setLoader(false));
        return;
      } else if (subAdmin[0].password === values.password) {
        dispatch(setAuth(role, subAdmin[0]));
        toast.success(`${role} logged in successfully`);
        navigate('/subAdminDashboard');
      } else {
        toast.error('Invalid Credentials , Try Again');
      }
      dispatch(setLoader(false));
    }

    if (role === 'admin') {
      dispatch(setLoader(true));
      const {data:admin} = await findUser('admin', values.email);
      if (values.email === admin[0].email && values.password === admin[0].password) {
        dispatch(setAuth(role, admin[0]));
        toast.success('Admin logged in successfully!');
        navigate('/adminDashboard');
      } else {
        toast.error('Invalid credential !!');
      }
      dispatch(setLoader(false));
    }
  }

  return (
    <>
    <HelmetHeader title='Signin' />
      <div>
        <Form className='p-0 gap-0' handleSubmit={handleSubmit} handleReset={handleReset}>
          <div>
            <Select onValueChange={(value) => setRole(value)}>
              <SelectTrigger className='w-full mb-2 text-primary-text text-[12px] md:text-sm'>
                <SelectValue placeholder='Select Role' />
              </SelectTrigger>
              <SelectContent>
                {options.map((option, idx) => (
                  <SelectItem key={idx} value={option.value} className='text-primary-text text-[12px] md:text-sm'>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Button type='submit' className='text-[12px] md:text-sm' disabled={loader}>
              {!loader ? (
                'SIGN IN'
              ) : (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please Wait
                </>
              )}
            </Button>
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
