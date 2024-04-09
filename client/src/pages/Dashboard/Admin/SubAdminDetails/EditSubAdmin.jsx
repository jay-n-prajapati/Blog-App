import AddEditSubAdmin from '@/components/common/AddEditSubAdmin';
import { Button } from '@/components/ui/button';
import PropTypes from 'prop-types';
import { useState } from 'react';

const EditSubAdmin = ({ subAdmin, setSubAdmins, isEditMode, initialValues }) => {
  const [open, setOpen] = useState(false);
  return (
    <AddEditSubAdmin
      subAdmin={subAdmin}
      setSubAdmins={setSubAdmins}
      isEditMode={isEditMode}
      initialValues={initialValues}
      open={open}
      handleOpen={setOpen}
    >
      <Button variant='link' className={`px-0`} size='sm'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='22'
          height='22'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-pencil'
        >
          <path d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' />
          <path d='m15 5 4 4' />
        </svg>
      </Button>
    </AddEditSubAdmin>
  );
};

EditSubAdmin.propTypes = {
  subAdmin: PropTypes.object,
  setSubAdmins: PropTypes.func,
  isEditMode: PropTypes.bool,
  initialValues: PropTypes.object,
};

export default EditSubAdmin;
