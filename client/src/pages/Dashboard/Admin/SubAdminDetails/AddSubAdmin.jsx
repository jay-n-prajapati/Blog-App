import AddEditSubAdmin from '@/components/common/AddEditSubAdmin';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const AddSubAdmin = ({ setRender, render }) => {
  const [open, setOpen] = useState(false);

  return (
    <AddEditSubAdmin open={open} handleOpen={setOpen} setRender={setRender} render={render}>
      <Button size='sm' onClick={() => setOpen(true)}>
        <Plus />
        Add New
      </Button>
    </AddEditSubAdmin>
  );
};

AddSubAdmin.propTypes = {
  setRender: PropTypes.func,
  render: PropTypes.bool,
};

export default React.memo(AddSubAdmin);
