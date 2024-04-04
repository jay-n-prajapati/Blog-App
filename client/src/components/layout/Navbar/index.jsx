import { NavLink, useNavigate } from 'react-router-dom';
import Links from './Links';
// import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { links } from './LinkData';
import { LogOut } from 'lucide-react';
import { removeAuth } from '@/redux/actions/authActions';
import { toast } from 'react-toastify';
import useRole from '@/utils/custom-hooks/useRole';
import CommonAvatar from '@/components/common/Avatar';


const Navbar = () => {
  // const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const { currentUser } = useRole();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(removeAuth());
    navigate('/');
    toast.success('Logout Successfully');
  };

  return (
    <nav className='sticky top-0 right-0 w-full z-50 bg-white transition-all duration-300 ease-in-out'>
      <div className='py-1 px-4 md:px-6  flex items-center justify-between border-b border-black'>
        <div className='flex items-center justify-between w-full md:w-auto'>
          <div className=' size-[3rem] sm:size-[3.5rem] overflow-hidden'>
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
                  className='rounded-3xl text-[10px] sm:text-[12px] md:text-sm border border-transparent bg-black font-sohne-light px-6 hover:text-black hover:bg-transparent hover:border hover:border-black'
                  >
                  Log In
                </Button>
              </>
            ) : (
              <div className='flex items-center gap-2'>
                <CommonAvatar userName={currentUser.name} className='size-8 sm:size-10' />
                <Button
                  size='icon'
                  className='text-white border border-transparent bg-black font-sohne-light px-6 hover:text-black hover:bg-transparent hover:border hover:border-black p-2 size-8 sm:size-10'
                  variant='outline'
                  onClick={handleLogOut}
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
