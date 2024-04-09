import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteBlog, getUser, updateUser } from '@/utils/axios-instance';
import { toast } from 'react-toastify';
import { setLoader } from '@/redux/actions/appActions';
import { removeFromSavedBlogs } from '@/utils/services/services';
import DeleteWithModal from '@/components/common/DeleteWithModal';

const DeleteBlog = ({ blog, blogs, setBlogs }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(setLoader(true));
    try {
      const {
        success: getUserSuccess,
        data: currentUser,
        error: getUserErr,
      } = await getUser(blog.authorId);
      if (!getUserSuccess) {
        toast.error(`Error : ${getUserErr}`);
        return;
      }
      const filteredBlogs = currentUser.publishedBlogs.filter((blogId) => blogId !== blog.id);
      currentUser.publishedBlogs = filteredBlogs;
      const { success, error } = await updateUser(currentUser.id, 'users', {
        publishedBlogs: currentUser.publishedBlogs,
      });
      if (!success) {
        toast.error(`Error : ${error}`);
        return;
      }
      await removeFromSavedBlogs(blog);

      const blogId = blog.id;
      const updatedBlogsArr = blogs.filter((blog) => blog.id !== blogId);
      const { success: deleteSuccess, error: deleteErr } = await deleteBlog(blog.id);
      if (!deleteSuccess) {
        toast.error(`Error : ${deleteErr}`);
        return;
      }
      setBlogs(updatedBlogsArr);
      toast.success('Blog deleted Successfully')
    } catch (error) {
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

DeleteBlog.propTypes = {
  blog: PropTypes.object,
  blogs: PropTypes.array,
  setBlogs: PropTypes.func,
};

export default DeleteBlog;
