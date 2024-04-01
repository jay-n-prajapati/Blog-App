import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { NavLink } from 'react-router-dom';
import Links from './Links';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
// import { publicLinks } from './LinkData';
import Auth from '@/pages/Authantication/index';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 right-0 w-full z-50 bg-white transition-all duration-300 ease-in-out">
      <div className="py-1 px-6 flex  flex-col md:flex-row items-center justify-between border-b border-secondary">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="size-[3rem] overflow-hidden">
            <NavLink to="/">
              <img src="/images/logo/blogify-logo.svg" alt="logo " className="size-full" />
            </NavLink>
          </div>
          <div className="block md:hidden cursor-pointer">
            {open ? <X onClick={() => setOpen(!open)} /> : <Menu onClick={() => setOpen(!open)} />}
          </div>
        </div>
        <div className={`${open ? 'block' : 'hidden'} md:block w-full md:w-auto`}>
          <Links linkToRender={[]}>
            {true ? (
              <>
                <NavLink to="/auth">
                  <Button className="rounded-3xl text-[14px] border border-transparent bg-black font-sohne-light px-6 hover:text-black hover:bg-transparent hover:border hover:border-black">
                    Get Started
                  </Button>
                </NavLink>
              </>
            ) : (
              <Avatar>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
          </Links>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
