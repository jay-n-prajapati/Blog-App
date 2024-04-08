import { deleteBlog, deleteUser, getSingleBlogs } from '@/utils/axios-instance';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setLoader } from '@/redux/actions/appActions';
import DeleteWithModal from '@/components/common/DeleteWithModal';
import { removeFromSavedBlogs } from '@/utils/services/services';

const DeleteUserButton = ({ currentUser, users, setUsers }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(setLoader(true));
    const { success, error } = await deleteUser(currentUser.id);
    if (!success) {
      dispatch(setLoader(false));
      toast.error(`Error : ${error}`);
      return;
    }
    const updatedUsers = users.filter((user) => user.id !== currentUser.id);

    // have to delete its blogs also

    for (let blogId of currentUser.publishedBlogs) {
      const { success, data: blog, error } = await getSingleBlogs(blogId);
      if (!success) {
        toast.error(`Error : ${error} `);
        return;
      }
      // removing blogId from user who saved it.
      await removeFromSavedBlogs(...blog);

      // deleting blog
      const { success: deleteSuccess, error: deleteErr } = await deleteBlog(blogId);
      if (!deleteSuccess) {
        dispatch(setLoader(false));
        toast.error(`Error : ${deleteErr}`);
        return;
      }
    }
    setUsers(updatedUsers);
    toast.success('User Deleted Successfully');
    dispatch(setLoader(false));
  };
  return (
    <DeleteWithModal
      title='Are you Sure ?'
      description='this will remove user permanently'
      handleDelete={handleDelete}
    />
  );
};

DeleteUserButton.propTypes = {
  currentUser: PropTypes.object,
  users: PropTypes.array,
  setUsers: PropTypes.func,
};

export default DeleteUserButton;
