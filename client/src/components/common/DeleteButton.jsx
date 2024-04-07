import useRole from '@/utils/custom-hooks/useRole';
import { Button } from '../ui/button';
import { CustomTooltip } from './Tooltip';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/actions/authActions';
import { deleteBlog, getUser, updateUser } from '@/utils/axios-instance';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogClose,
} from '../ui/dialog';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { setLoader } from '@/redux/actions/appActions';
import { useSelector } from 'react-redux';

const DeleteButton = ({ blog }) => {
  const { currentUser, endPoint, role } = useRole();
  const { loader } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(setLoader(true));
    const filteredBlogs = currentUser.publishedBlogs.filter((blogId) => blogId !== blog.id);
    currentUser.publishedBlogs = filteredBlogs;
    const { error } = await updateUser(currentUser.id, endPoint, {
      publishedBlogs: currentUser.publishedBlogs,
    });
    if (error) {
      toast.error(`Error : ${error}`);
      return;
    }

    blog.savedBy.forEach(async (userId) => {
      const { data: userData, error: userErr } = await getUser(userId);
      if (userErr) {
        toast.error(`Error : ${userErr}`);
        return;
      }
      const filteredSavedBlogs = userData.savedBlogs.filter((blogId) => blogId !== blog.id);
      try {
        await updateUser(userId, 'users', {
          // issue may be occur here
          savedBlogs: filteredSavedBlogs,
        });
      } catch (error) {
        toast.error(`Error : ${error}`);
      }
    });

    const { error: deleteErr } = await deleteBlog(blog.id);
    if (deleteErr) {
      toast.error(`Error : ${deleteErr}`);
      return;
    }
    console.log('deleted');
    dispatch(setAuth(role, currentUser));
    dispatch(setLoader(false));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <CustomTooltip content='Delete Story'> */}
        <Button variant='link' className={`px-0`} size='sm'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='22'
            height='22'
            viewBox='0 0 24 24'
            fill='none'
            stroke='black'
            strokeWidth='1'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-trash-2'
          >
            <path d='M3 6h18' />
            <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
            <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
            <line x1='10' x2='10' y1='11' y2='17' />
            <line x1='14' x2='14' y1='11' y2='17' />
          </svg>
        </Button>
        {/* </CustomTooltip> */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='my-2'>
          <DialogTitle className='text-center text-3xl font-sohne-light'>
            Are You Sure ?
          </DialogTitle>
          <DialogDescription className='text-center text-primary-text text-[14px]'>
            Deleting this Content will permanently removed.
          </DialogDescription>
        </DialogHeader>
        <div className='flex gap-4 items-center justify-center'>
          <Button variant='destructive' onClick={handleDelete}>
            {loader ? <LoaderCircle className='animate-spin mr-2' /> : null}
            Delete
          </Button>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

DeleteButton.propTypes = {
  blog: PropTypes.object,
};

export default DeleteButton;
