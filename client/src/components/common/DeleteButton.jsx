import useRole from '@/utils/custom-hooks/useRole';
import { Button } from '../ui/button';
import { CustomTooltip } from './Tooltip';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/actions/authActions';
import { deleteBlog, getUser, updateUser } from '@/utils/axios-instance';
import {toast} from 'react-toastify'

const DeleteButton = ({ blog }) => {
  const { currentUser, endPoint, role } = useRole();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const filteredBlogs = currentUser.publishedBlogs.filter((blogId) => blogId !== blog.id);
    currentUser.publishedBlogs = filteredBlogs;
    const {data,error} = await updateUser(currentUser.id,endPoint,{publishedBlogs : currentUser.publishedBlogs})
    if (error) {
      toast.error(`Error : ${error}`)
      return
    }

    blog.savedBy.forEach( async (userId) => {
        const {data:userData , error:userErr} = await getUser(userId);
        if (userErr) {
          toast.error(`Error : ${userErr}`)
          return
        }
        const filteredSavedBlogs = userData.savedBlogs.filter((blogId) => blogId !== blog.id)
        const {error:updateErr} = await updateUser(userId,'users',{savedBlogs : filteredSavedBlogs})
        if (updateErr) {
          toast.error(`Error : ${updateErr}`)
          return
        }
    });

    const { data: deletedData, error: deleteErr } = await deleteBlog(blog.id);
    if (deleteErr) {
      toast.error(`Error : ${deleteErr}`)
      return
    }
    dispatch(setAuth(role, currentUser));
    console.log('deleted');
  };

  return (
    <CustomTooltip content='Delete Story'>
      <Button variant='link' className={`px-0`} size='sm' onClick={handleDelete}>
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
    </CustomTooltip>
  );
};

DeleteButton.propTypes = {
  blog: PropTypes.object,
};

export default DeleteButton;
