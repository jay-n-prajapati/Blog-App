import PropTypes from 'prop-types';
import DeleteWithModal from '@/components/common/DeleteWithModal';


const DeleteSubAdminButton = ({subAdmin , subAdmins ,setSubAdmins}) => {
  const handleDelete = async () => {};
  return (
    <DeleteWithModal
      title='Are you Sure ?'
      description='this will remove Sub Admin permanently'
      handleDelete={handleDelete}
    />
  );
};

DeleteSubAdminButton.propTypes = {
  subAdmin: PropTypes.object,
  subAdmins: PropTypes.array,
  setSubAdmins: PropTypes.func,
};

export default DeleteSubAdminButton;
