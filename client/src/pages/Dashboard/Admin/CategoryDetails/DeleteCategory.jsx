import DeleteWithModal from '@/components/common/DeleteWithModal';
import { deleteCategory } from '@/utils/axios-instance';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const DeleteCategory = ({ category, render, setRender }) => {
  const handleDelete = async () => {
    try {
      await deleteCategory(category.id);
      toast.success('Category Deleted')
      setRender(!render);
    } catch ({ error }) {
      toast.error(`Error : ${error}`);
    }
  };

  return (
    <DeleteWithModal
      title='Are you Sure ?'
      description='this will remove Category permanently'
      handleDelete={handleDelete}
    />
  );
};

DeleteCategory.propTypes = {
  category: PropTypes.object,
  render: PropTypes.bool,
  setRender: PropTypes.func,
};

export default DeleteCategory;
