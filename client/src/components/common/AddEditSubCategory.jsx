import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Form from './Form';
import { Button } from '../ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { updateCategory, updateUser } from '@/utils/axios-instance';
import { setLoader } from '@/redux/actions/appActions';
import { TagsInput } from 'react-tag-input-component';
import useRole from '@/utils/custom-hooks/useRole';
import { setAuth } from '@/redux/actions/authActions';

const AddEditSubCategory = ({
  children,
  open,
  handleOpen,
  initialValues,
  isEditMode = false,
  render,
  setRender,
  id,
}) => {
  const { loader } = useSelector((state) => state.app);
  const {currentUser , endPoint , role} = useRole()
  const dispatch = useDispatch()
  const { values, handleBlur, handleSubmit, handleReset, setFieldValue } =
    useFormik({
      initialValues: { subCategories : initialValues},
      onSubmit: onSubmit ,
    });

  async function onSubmit() {
    dispatch(setLoader(true));
    try {
      await updateCategory(id,{subCategories : values.subCategories});
      await updateUser(currentUser.id,endPoint,values)
      currentUser.subCategories = values.subCategories;
      dispatch(setAuth(role,currentUser))
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

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-3xl font-sohne-light'>
            Welcome Admin!
          </DialogTitle>
        </DialogHeader>
        <div>
          <Form className='gap-2' handleSubmit={handleSubmit} handleReset={handleReset}>
            <div>
              <TagsInput
                value={values.subCategories}
                onChange={(value) => setFieldValue('subCategories', value)}
                name='subCategories'
                onBlur={handleBlur}
              />
              <p>press Enter to add new tag</p>
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
            </div>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

AddEditSubCategory.propTypes = {
  isEditMode: PropTypes.bool,
  initialValues: PropTypes.array,
  children: PropTypes.node,
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  render: PropTypes.bool,
  setRender: PropTypes.func,
  id: PropTypes.string,
};

export default AddEditSubCategory;
