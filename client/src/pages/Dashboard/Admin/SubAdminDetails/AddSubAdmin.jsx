import Form from '@/components/common/Form';
import InputWithLabel from '@/components/common/InputWithLabel';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { addSubAdmin, getCategories, getSubAdmin } from '@/utils/axios-instance';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'react-toastify';
import { setLoader } from '@/redux/actions/appActions';
import PropTypes from 'prop-types';
import { DialogClose } from '@radix-ui/react-dialog';

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
const signUpSchema = yup.object({
  name: yup
    .string()
    .required('* required')
    .min(2, '* must contain atleast 2 characters')
    .max(25, '* must not contain more than 25 characters')
    .trim(),
  email: yup.string().email().required('* email is required').trim(),
  password: yup
    .string()
    .required('* required')
    .matches(
      passwordRules,
      '* Password must contain 1 UpperCase, 1 Lowercase, 1 special characters and 1 number',
    ),
  cpassword: yup
    .string()
    .required('* required')
    .oneOf([yup.ref('password')], '* Passwords must match'),
});
const AddSubAdmin = ({ setSubAdmins }) => {
  const { loader } = useSelector((state) => state.app);
  const [selectedValue, setSelectedValue] = useState('');
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, handleReset } =
    useFormik({
      initialValues: {
        name: 'Blogify SubTeam',
        email: '',
        password: '',
        cpassword: '',
      },
      validationSchema: signUpSchema,
      onSubmit: onSubmit,
    });

  async function onSubmit() {
    if (!selectedValue) {
      toast.warn('Select Category to proceed');
      return;
    }
    try {
      const { data } = await getSubAdmin(values.email);
      if (data.length !== 0) {
        toast.warn('Subadmin already exist');
        handleReset();
        return;
      }
    } catch (error) {
      toast.error(error);
    }

    const newSubAdmin = {
      name: values.name,
      email: values.email,
      bio: '',
      password: values.password,
      parentCategory: selectedValue,
      subCategories: [],
      savedBlogs: [],
      publishedBlogs: [],
    };
    try {
      dispatch(setLoader(true));
      await addSubAdmin(newSubAdmin);
      toast.success('Registered Successfully');
      setSubAdmins((prev) => [...prev, newSubAdmin]);
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(`Error : ${error}`);
    } finally {
      dispatch(setLoader(false));
    }
  }

  const fetchCategories = async () => {
    const { data } = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='22'
            height='22'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-plus'
          >
            <path d='M5 12h14' />
            <path d='M12 5v14' />
          </svg>
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-3xl font-sohne-light'>
            Welcome Admin!
          </DialogTitle>
          <DialogDescription className='text-center text-primary-text text-[14px]'>
            Fill the details to add new SubAdmin.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form className='gap-2' handleSubmit={handleSubmit} handleReset={handleReset}>
            <div>
              <InputWithLabel
                label='Name'
                labelFor='name'
                type='text'
                placeholder='Blogify SubTeam'
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
                placeholder='subadmin1@example.com'
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
            <div>
              <Select onValueChange={(value) => setSelectedValue(value)}>
                <SelectTrigger className='w-full mb-2 text-primary-text text-[12px] md:text-sm'>
                  <SelectValue placeholder='Select Category to Assign' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((option, idx) => (
                    <SelectItem
                      key={idx}
                      value={option.parentCategory}
                      className='text-primary-text text-[12px] md:text-sm'
                    >
                      {option.parentCategory}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex gap-2 mt-1'>
              <DialogClose asChild>
                <Button
                  type='submit'
                  className={`text-[12px] md:text-sm ${loader ? 'cursor-none' : null}`}
                  disabled={loader}
                >
                  {!loader ? (
                    'ADD'
                  ) : (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Please Wait
                    </>
                  )}
                </Button>
              </DialogClose>
              <Button type='submit' variant='outline' onClick={handleReset}>
                RESET
              </Button>
            </div>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

AddSubAdmin.propTypes = {
  setSubAdmins: PropTypes.func,
};

export default React.memo(AddSubAdmin);
