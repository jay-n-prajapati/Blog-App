import PropTypes from 'prop-types';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from 'react-router-dom';
import InputWithLabel from '@/components/common/InputWithLabel';
import useRole from '@/utils/custom-hooks/useRole';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updateUser } from '@/utils/axios-instance';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/actions/authActions';

const EditProfileDialog = ({ children , open ,setOpen }) => {
  const { currentUser, endPoint, role } = useRole();
  const [isProfChanged, setIsProfChanged] = useState(false);
  const dispatch = useDispatch();
  const [profInfo, setProfInfo] = useState({
    name: currentUser.name,
    bio: currentUser.bio,
  });

  const handleChange = (e) => {
    setProfInfo({
      ...profInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleBlur = (e) => {
    setProfInfo({
      ...profInfo,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, error } = await updateUser(currentUser.id, endPoint, {
      name: profInfo.name,
      bio: profInfo.bio,
    });
    if (!success) {
      toast(`Error : ${error}`);
      return;
    }
    currentUser.name = profInfo.name;
    currentUser.bio = profInfo.bio;
    dispatch(setAuth(role, currentUser));
    toast.success('Profile updated Successfully');
    setOpen(false);
  };

  useEffect(() => {
    setIsProfChanged(!(currentUser.name === profInfo.name && currentUser.bio === profInfo.bio));
  }, [profInfo]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-xl font-sohne-light'>
            Profile Information
          </DialogTitle>
        </DialogHeader>
        <div>
          <Form>
            <div className='flex flex-col gap-4'>
              <InputWithLabel
                label='Name'
                labelFor='name'
                value={profInfo.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <InputWithLabel
                label='Bio'
                labelFor='bio'
                value={profInfo.bio}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='write something about you..'
              />
            </div>
            <div className='flex gap-4 mt-4'>
                <Button type='submit' disabled={!isProfChanged} onClick={handleSubmit}>
                  Save
                </Button>
     
                <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                  Close
                </Button>

            </div>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

EditProfileDialog.propTypes = {
  children: PropTypes.node,
};

export default EditProfileDialog;
