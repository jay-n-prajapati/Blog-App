import useRole from '@/utils/custom-hooks/useRole';
import { Button } from '../ui/button';
import { CustomTooltip } from './Tooltip';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/actions/authActions';
import { updateBlog, updateUser } from '@/utils/axios-instance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const SaveButton = ({ blog }) => {
  const { isAuth, currentUser, endPoint, role } = useRole();
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!isAuth) {
      toast.warn('First Login To save blog');
      navigate('/auth');
      return;
    }
    currentUser.savedBlogs.push(blog.id);
    blog.savedBy.push(currentUser.id);
    const { success, error } = await updateUser(currentUser.id, endPoint, {
      savedBlogs: currentUser.savedBlogs,
    });
    if (!success) {
      toast.error(`Error : ${error}`);
    }
    const { success: updateSuccess, error: updateBlogError } = await updateBlog(blog.id, {
      savedBy: blog.savedBy,
    });
    if (!updateSuccess) {
      toast.error(`Error : ${updateBlogError}`);
      return;
    }
    setIsSaved(true);
    dispatch(setAuth(role, currentUser));
    toast.success('blog saved to Library');
  };

  const handleRemove = async () => {
    if (!isAuth) {
      toast.warn('First Login To remove from library');
      navigate('/auth');
      return;
    }
    const filteredSavedBlogs = currentUser.savedBlogs.filter((blogID) => blogID !== blog.id);
    currentUser.savedBlogs = filteredSavedBlogs;
    const { success, error } = await updateUser(currentUser.id, endPoint, {
      savedBlogs: filteredSavedBlogs,
    });
    if (!success) {
      toast.error(`Error : ${error}`);
      return;
    }
    const filteredSavedBy = blog.savedBy.filter((authorId) => authorId !== currentUser.id);
    const { success: updateSuccess, error: updateErr } = await updateBlog(blog.id, {
      savedBy: filteredSavedBy,
    });

    if (!updateSuccess) {
      toast.error(`Error : ${updateErr}`);
      return;
    }

    setIsSaved(false);
    dispatch(setAuth(role, currentUser));
    toast.info('blog removed from Library');
  };

  useEffect(() => {
    blog && currentUser && currentUser.savedBlogs.includes(blog.id)
      ? setIsSaved(true)
      : setIsSaved(false);
  }, [blog, isSaved]);

  return (
    <CustomTooltip content={isSaved ? 'Remove from Library' : 'Add to Library'}>
      {isSaved ? (
        <Button variant='link' className={`px-0`} size='sm' onClick={handleRemove}>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' className='ni nj'>
            <path d='M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.25 12h7.5' stroke='red'></path>
          </svg>
        </Button>
      ) : (
        <Button variant='link' className={`px-0 text-destructive`} size='sm' onClick={handleSave}>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' className='nk'>
            <path
              d='M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z'
              fill='#000'
            ></path>
          </svg>
        </Button>
      )}
    </CustomTooltip>
  );
};

SaveButton.propTypes = {
  blog: PropTypes.object,
};

export default SaveButton;
