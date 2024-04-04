import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import Links from './Links';
// import { Menu, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { links } from './LinkData';
import { LogOut } from 'lucide-react';
import { removeAuth } from '@/redux/actions/authActions';
import { toast } from 'react-toastify';
// import { publicLinks } from './LinkData';

const Navbar = () => {
  // const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const { isAuth, user, subAdmin, admin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getName = useCallback(() => {
    const getUserName = (user) => {
      const names = user.name.split(' ');
      const firstLetters = names
        .map((name) => name[0])
        .join('')
        .toUpperCase();
      return firstLetters.substring(0, 2);
    };
    return admin ? 'AD' : subAdmin ? 'SA' : user ? getUserName(user) : null;
  }, [user, admin, subAdmin]);

  const handleLogOut = () =>{
    dispatch(removeAuth())
    navigate('/')
    toast.success('Logout Successfully')
  }

  return (
    <nav className='sticky top-0 right-0 w-full z-50 bg-white transition-all duration-300 ease-in-out'>
      <div className='py-1 px-4 md:px-6  flex items-center justify-between border-b border-black'>
        <div className='flex items-center justify-between w-full md:w-auto'>
          <div className='size-[3.5rem] overflow-hidden'>
            <NavLink to='/'>
              <img src='/images/logo/blogify-logo.svg' alt='logo ' className='size-full' />
            </NavLink>
          </div>
          {/* <div className='block md:hidden cursor-pointer'>
            {open ? <X onClick={() => setOpen(!open)} /> : <Menu onClick={() => setOpen(!open)} />}
          </div> */}
        </div>
        <div className={`block w-auto`}>
          <Links linkToRender={links}>
            {!isAuth ? (
              <>
                <Button
                  onClick={() => navigate('/auth')}
                  className='rounded-3xl text-[12px] md:text-sm border border-transparent bg-black font-sohne-light px-6 hover:text-black hover:bg-transparent hover:border hover:border-black'
                >
                  Log In
                </Button>
              </>
            ) : (
              <div className='flex items-center gap-2'>
                <Avatar className='border-2'>
                  <AvatarFallback>{getName()}</AvatarFallback>
                </Avatar>
                <Button
                  size='icon'
                  className='text-white text-[12px] border border-transparent bg-black font-sohne-light px-6 hover:text-black hover:bg-transparent hover:border hover:border-black p-2'
                  variant='outline'
                  onClick = {handleLogOut}
                >
                  <LogOut />
                </Button>
              </div>
            )}
          </Links>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
