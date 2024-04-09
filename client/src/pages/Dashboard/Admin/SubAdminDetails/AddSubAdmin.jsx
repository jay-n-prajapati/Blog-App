import AddEditSubAdmin from '@/components/common/AddEditSubAdmin';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const AddSubAdmin = ({ setSubAdmins }) => {

  const [open , setOpen] = useState(false)

  return (
    <AddEditSubAdmin setSubAdmins={setSubAdmins} open={open} handleOpen={setOpen}>
      <Button size='sm' onClick={() =>setOpen(true)}>
        <Plus/>
        Add New
      </Button>
    </AddEditSubAdmin>
  );
};

AddSubAdmin.propTypes = {
  setSubAdmins: PropTypes.func,
  isEditMode: PropTypes.bool,
  initialValues: PropTypes.object,
};

export default AddSubAdmin;
