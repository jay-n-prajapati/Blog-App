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
import {
  addSubAdmin,
  getCategories,
  getSingleCategories,
  getSubAdmin,
  updateCategory,
  updateUser,
} from '@/utils/axios-instance';
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
import { TagsInput } from 'react-tag-input-component';

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
const Schema = yup.object({
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
  parentCategory: yup.string().required('* required'),
});

const AddEditSubAdmin = ({
  children,
  initialValues,
  isEditMode = false,
  open = false,
  handleOpen,
  render,
  setRender,
}) => {
  const { loader } = useSelector((state) => state.app);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
  } = useFormik({
    initialValues: isEditMode
      ? initialValues
      : {
          name: 'Blogify SubTeam',
          email: '',
          password: '',
          cpassword: '',
          parentCategory: '',
          subCategories: [],
        },
    validationSchema: Schema,
    onSubmit: isEditMode ? onEditSubmit : onAddSubmit,
  });

  async function onAddSubmit() {
    try {
      const { data } = await getSubAdmin(values.email);
      if (data.length !== 0) {
        toast.warn('Subadmin already exist');
        handleReset();
        return;
      }
    } catch ({ error }) {
      toast.error(error);
    }
    const newSubAdmin = {
      name: values.name,
      email: values.email,
      password: values.password,
      parentCategory: values.parentCategory,
      bio: '',
      subCategories: values.setCategories,
      savedBlogs: [],
      publishedBlogs: [],
    };
    try {
      dispatch(setLoader(true));
      await addSubAdmin(newSubAdmin);
      toast.success('Registered Successfully');
      handleReset();
      handleOpen(false);
      setRender(!render);
    } catch ({ error }) {
      toast.error(`Error : ${error}`);
    } finally {
      dispatch(setLoader(false));
    }
  }

  async function onEditSubmit() {
    try {
      const updateSubAdmin = {
        id: initialValues.id,
        name: values.name,
        email: values.email,
        password: values.password,
        parentCategory: values.parentCategory,
        bio: '',
        subCategories: values.subCategories,
        savedBlogs: [],
        publishedBlogs: [],
      };
      const { data } = await getSingleCategories(values.parentCategory);
      await updateUser(initialValues.id, 'subAdmins', updateSubAdmin); // updating subAdmin
      await updateCategory(data[0].id, { subCategories: values.subCategories }); // updating sub category
      toast.success(`Updated Successfully`);
      setRender(!render);
      handleReset();
      handleOpen(false);
    } catch ({ error }) {
      toast.error(`Error : ${error}`);
    }
  }

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch ({ error }) {
      toast.error(`Error : ${error}`);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-3xl font-sohne-light'>
            Welcome Admin!
          </DialogTitle>
          <DialogDescription className='text-center text-primary-text text-[14px]'>
            {isEditMode
              ? 'Fill the details to update SubAdmin.'
              : 'Fill the details to add new SubAdmin.'}
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
              <Select
                onValueChange={(value) => {
                  setFieldValue('parentCategory', value);
                }}
                value={values.category}
              >
                <SelectTrigger className='w-full mb-2 text-primary-text text-[12px] md:text-sm'>
                  <SelectValue
                    placeholder={isEditMode ? values.parentCategory : `Select Category to Assign`}
                  />
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
              {touched.category && errors.category ? (
                <p className='text-left text-destructive text-[10px]'>{errors.category}</p>
              ) : (
                <p className='opacity-0 text-[10px]'>null</p>
              )}
            </div>
            {isEditMode ? (
              <div>
                <TagsInput
                  value={values.subCategories}
                  onChange={(value) => setFieldValue('subCategories', value)}
                  name='subCategories'
                  onBlur={handleBlur}
                />
                <p>press Enter to add new tag</p>
              </div>
            ) : null}
            <div className='flex gap-2 mt-1'>
              <Button
                type='submit'
                className={`text-[12px] md:text-sm ${loader ? 'cursor-none' : null}`}
                disabled={loader}
              >
                {!loader ? (
                  isEditMode ? (
                    'Update'
                  ) : (
                    'Add'
                  )
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
      </DialogContent>
    </Dialog>
  );
};

AddEditSubAdmin.propTypes = {
  subAdmin: PropTypes.object,
  setSubAdmins: PropTypes.func,
  isEditMode: PropTypes.bool,
  initialValues: PropTypes.object,
  children: PropTypes.node,
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  setRender: PropTypes.func,
  render: PropTypes.bool,
};

export default React.memo(AddEditSubAdmin);
