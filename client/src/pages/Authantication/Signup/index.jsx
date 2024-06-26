import PropTypes from 'prop-types';
import Form from '@/components/common/Form';
import { Button } from '@/components/ui/button';
import InputWithLabel from '@/components/common/InputWithLabel';
import { useFormik } from 'formik';
import { addUser, getUsers } from '@/utils/axios-instance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '@/redux/actions/appActions';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { setAuth } from '@/redux/actions/authActions';
import HelmetHeader from '@/components/common/HelmetHeader';
import { signUpSchema } from '@/utils/Constants/constants';



const Signup = ({ setContent }) => {
  const [users, setUsers] = useState([]);
  const { loader } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, handleReset } =
    useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
        cpassword: '',
      },
      validationSchema: signUpSchema,
      onSubmit: onSubmit,
    });

  // registering user
  async function onSubmit() {
    const newUser = {
      name : values.name,
      email : values.email,
      bio : '',
      password : values.password,
      savedBlogs: [],
      publishedBlogs: [],
    };
    const idx = users.findIndex((user) => user.email === values.email);
    if (idx !== -1) {
      toast.warn('User Already Exist, Please Login');
      return;
    }
    try {
      dispatch(setLoader(true));
      await addUser(newUser);
      dispatch(setAuth('user', newUser));
      toast.success('Registered Successfully');
      navigate('/home');
    } catch ({error}) {
      toast.error(`Error : ${error}`);
    } finally {
      dispatch(setLoader(false));
    }
  }

  async function fetchUsers() {
    const { data } = await getUsers();
    setUsers(data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
    <HelmetHeader title='Signup' />
      <div>
        <Form className='p-0 gap-0' handleSubmit={handleSubmit} handleReset={handleReset}>
          <div>
            <InputWithLabel
              label='Name'
              labelFor='name'
              type='text'
              placeholder='John Doe'
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name ? (
              <p className='text-left text-destructive text-[10px]'>{errors.name}</p>
            ) : (
              <p className='opacity-0 text-[10px]'>null</p>
            )}
          </div>
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
          <div>
            <InputWithLabel
              label='Confirm Password'
              labelFor='cpassword'
              type='password'
              value={values.cpassword}
              placeholder='John@123'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.cpassword && errors.cpassword ? (
              <p className='text-left text-destructive text-[10px]'>{errors.cpassword}</p>
            ) : (
              <p className='opacity-0 text-[10px]'>null</p>
            )}
          </div>
          <div className='flex gap-2 mt-1'>
            <Button
              type='submit'
              className={`text-[12px] md:text-sm ${loader ? 'cursor-none' : null}`}
              disabled={loader}
            >
              {!loader ? (
                'SIGN IN'
              ) : (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please Wait
                </>
              )}
            </Button>
            <Button type='submit' variant='outline' onClick={handleReset}>
              RESET
            </Button>
          </div>
        </Form>
      </div>
      <div className='flex items-center justify-center gap-1 text-primary-text text-[12px] md:text-sm'>
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
