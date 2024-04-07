import CommonAvatar from '@/components/common/Avatar';
import { Button } from '@/components/ui/button';
import useRole from '@/utils/custom-hooks/useRole';
import { NavLink } from 'react-router-dom';
import EditProfileDialog from './EditProfileDialog';
import { useState } from 'react';

const Profile = () => {
  const { currentUser } = useRole();
  const [open , setOpen ] = useState(false)
  return (
    <div className='p-4 px-6 min-h-[85vh] flex items-center justify-center'>
      <div className='flex w-full'>
        <div className='w-1/2 p-6 hidden md:block m-auto'>
          <img src='/images/profile-img.gif' alt='profile placeholder' className='w-full' />
        </div>
        <div className='w-full md:w-1/2 md:px-16 flex items-center'>
          <div className='flex flex-col gap-5 w-full'>
            <div>
              <CommonAvatar userName={currentUser.name} className='size-16 cursor-default' />
              <p className='text-2xl font-bold mt-2'>{currentUser.name}</p>
              <p className='text-primary-text text-xs'>{currentUser.email}</p>
              {currentUser.bio && (
                <div className='mt-2'>
                  <p className='text-lg font-bold'>Bio :</p>
                  <p className='py-1 text-lg text-primary-text max-w-[60%]'>{currentUser.bio}</p>
                </div>
              )}
            </div>
            <div className='flex flex-col'>
              <NavLink to='/stories'>
                <Button variant='link' className='p-0 h-8'>
                  Published Blogs
                </Button>
                : {currentUser.publishedBlogs.length}
              </NavLink>
              <NavLink to='/library'>
                <Button variant='link' className='p-0 h-8'>
                  Saved Blogs
                </Button>
                : {currentUser.savedBlogs.length}
              </NavLink>
            </div>
            <div>
              <EditProfileDialog open={open} setOpen={setOpen}>
                <Button onClick={() => setOpen(true)}>Edit Profile</Button>
              </EditProfileDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
