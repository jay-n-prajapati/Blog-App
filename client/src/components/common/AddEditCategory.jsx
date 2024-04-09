import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Form from './Form';
import { Button } from '../ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { Loader2 } from 'lucide-react';
import InputWithLabel from './InputWithLabel';
import { toast } from 'react-toastify';
import { addCategory, getSingleCategories, updateCategory } from '@/utils/axios-instance';
import { setLoader } from '@/redux/actions/appActions';

const Schema = yup.object({
  parentCategory: yup
    .string()
    .required('* required')
    .min(2, '* must contain atleast 2 characters')
    .max(25, '* must not contain more than 25 characters')
    .trim(),
});

const AddEditCategory = ({
  children,
  open,
  handleOpen,
  initialValues,
  isEditMode = false,
  render,
  setRender,
}) => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.app);
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, handleReset } =
    useFormik({
      initialValues: isEditMode
        ? initialValues
        : {
            parentCategory: '',
            subcategories: [],
          },
      validationSchema: Schema,
      onSubmit: isEditMode ? onEditSubmit : onAddSubmit,
    });

  async function onAddSubmit() {
    dispatch(setLoader(true));
    try {
      const { data } = await getSingleCategories(values.parentCategory);
      if (data.length !== 0) {
        toast.warn('Category already exist , add another.');
        return;
      }
      await addCategory(values);
      toast.success('Category added');
      handleOpen(false);
      setRender(!render);
      handleReset();
    } catch ({ error }) {
      toast.error(`Error : ${error}`);
    } finally {
      dispatch(setLoader(false));
    }
  }

  async function onEditSubmit() {
    dispatch(setLoader(true));
    try {
      await updateCategory(initialValues.id, { parentCategory: values.parentCategory });
      toast.success('Category updated');
      handleOpen(false);
      setRender(!render);
      handleReset();
    } catch ({ error }) {
      toast.error(`Error : ${error}`);
    } finally {
      dispatch(setLoader(false));
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-3xl font-sohne-light'>
            Welcome Admin!
          </DialogTitle>
          <DialogDescription className='text-center text-primary-text text-[14px]'>
            {isEditMode ? 'Edit Category Here.' : 'Add New Category Here.'}
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form className='gap-2' handleSubmit={handleSubmit} handleReset={handleReset}>
            <div>
              <InputWithLabel
                label='Category'
                labelFor='parentCategory'
                type='text'
                placeholder='eg. Educational Blog'
                value={values.parentCategory}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name ? (
                <p className='text-left text-destructive text-[10px]'>{errors.parentCategory}</p>
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

AddEditCategory.propTypes = {
  isEditMode: PropTypes.bool,
  initialValues: PropTypes.object,
  children: PropTypes.node,
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  render: PropTypes.bool,
  setRender: PropTypes.func,
};

export default AddEditCategory;
