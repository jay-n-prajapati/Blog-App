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
    dispatch(setLoader(true));
    const filteredBlogs = currentUser.publishedBlogs.filter((blogId) => blogId !== blog.id);
    currentUser.publishedBlogs = filteredBlogs;
    const { success, error } = await updateUser(currentUser.id, endPoint, {
      publishedBlogs: currentUser.publishedBlogs,
    });
    if (!success) {
      toast.error(`Error : ${error}`);
      return;
    }
    await removeFromSavedBlogs(blog);
    const { success: deleteSuccess, error: deleteErr } = await deleteBlog(blog.id);
    if (!deleteSuccess) {
      toast.error(`Error : ${deleteErr}`);
      return;
    }
    console.log(currentUser);
    dispatch(setAuth(role, currentUser));
    dispatch(setLoader(false));
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
