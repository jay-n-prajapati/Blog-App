import PropTypes from 'prop-types';
import DeleteWithModal from '@/components/common/DeleteWithModal';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setLoader } from '@/redux/actions/appActions';
import { removeFromSavedBlogs } from '@/utils/services/services';
import { deleteBlog, deleteSubAdmin, getSingleBlogs } from '@/utils/axios-instance';
import React from 'react';

const DeleteSubAdmin = ({ subAdmin, subAdmins, setSubAdmins }) => {
  const dispatch = useDispatch();
  
  const handleDelete = async () => {
    dispatch(setLoader(true));
    try {
      const { success, error } = await deleteSubAdmin(subAdmin.id);
      if (!success) {
        toast.error(`Error : ${error}`);
        return;
      }
      const updatedSubAdmins = subAdmins.filter((user) => user.id !== subAdmin.id);
      // have to delete its blogs also
      for (let blogId of subAdmin.publishedBlogs) {
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
          toast.error(`Error : ${deleteErr}`);
          return;
        }
      }
      setSubAdmins(updatedSubAdmins);
      toast.success('Sub Admin Deleted Successfully');
    } catch (error) {
      toast.error(`Error : ${error}`);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <DeleteWithModal
      title='Are you Sure ?'
      description='this will remove Sub Admin permanently'
      handleDelete={handleDelete}
    />
  );
};

DeleteSubAdmin.propTypes = {
  subAdmin: PropTypes.object,
  subAdmins: PropTypes.array,
  setSubAdmins: PropTypes.func,
};

export default React.memo(DeleteSubAdmin);
