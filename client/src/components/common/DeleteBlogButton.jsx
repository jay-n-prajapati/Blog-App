import useRole from '@/utils/custom-hooks/useRole';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/actions/authActions';
import { deleteBlog, updateUser } from '@/utils/axios-instance';
import { toast } from 'react-toastify';
import { setLoader } from '@/redux/actions/appActions';
import DeleteWithModal from './DeleteWithModal';
import { removeFromSavedBlogs } from '@/utils/services/services';

const DeleteButton = ({ blog }) => {
  const { currentUser, endPoint, role } = useRole();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      dispatch(setLoader(true));
      // deleting from users published blogs
      const filteredBlogs = currentUser.publishedBlogs.filter((blogId) => blogId !== blog.id);
      currentUser.publishedBlogs = filteredBlogs;
      await updateUser(currentUser.id, endPoint, {
        publishedBlogs: currentUser.publishedBlogs,
      });
      // deleting from users saved blogs who saved it
      await removeFromSavedBlogs(blog);
      // deleting it from all blogs
      await deleteBlog(blog.id);
      dispatch(setAuth(role, currentUser));
    } catch ({ error }) {
      toast.error(`Error : ${error}`);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <DeleteWithModal
      title='Are You Sure ?'
      description='deleting this Blog will be permanently removed ?'
      handleDelete={handleDelete}
    />
  );
};

DeleteButton.propTypes = {
  blog: PropTypes.object,
};

export default DeleteButton;
