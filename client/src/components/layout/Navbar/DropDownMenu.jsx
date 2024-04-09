import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const DropDown = ({ children, links }) => {
  const [open , setOpen] = useState(false)
  const dropDownRef = useRef(null);

  const closeHandler = (e) => {
    if ( dropDownRef && !dropDownRef?.current?.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeHandler);
  });
  return (
    <DropdownMenu className='outline-none ring-0' open={open}>
      <DropdownMenuTrigger onClick={() => setOpen(true)}>{children}</DropdownMenuTrigger>
      <DropdownMenuContent ref={dropDownRef} >
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        {links.map((link, idx) => (
          <DropdownMenuItem key={idx} className='px-0'>
            <NavLink
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex gap-2 items-center text-xs sm:text-sm text-[#6b6b6b] w-full p-1 rounded ${
                  isActive ? 'bg-accent' : ''
                }`
              }
              to={link.slug}
            >
              {link.icon}
              {link.label}
            </NavLink>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
DropDown.propTypes = {
  children: PropTypes.node,
  links: PropTypes.array,
};
export default DropDown;
