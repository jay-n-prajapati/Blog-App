import AddEditCategory from '@/components/common/AddEditCategory';
import { Button } from '@/components/ui/button';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const EditCategory = ({isEditMode, initialValues , setRender , render }) => {
  const [open, setOpen] = useState(false);
  return (
    <AddEditCategory
      isEditMode={isEditMode}
      initialValues={initialValues}
      open={open}
      handleOpen={setOpen}
      setRender={setRender}
      render={render}
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
    </AddEditCategory>
  );
};

EditCategory.propTypes = {
  isEditMode: PropTypes.bool,
  initialValues: PropTypes.object,
  setRender: PropTypes.func,
  render: PropTypes.bool,
};

export default React.memo(EditCategory);
