import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const DropDown = ({ children, links }) => {
  return (
    <DropdownMenu className='outline-none ring-0'>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        {links.map((link, idx) => (
          <DropdownMenuItem key={idx} className='px-0'>
            <NavLink
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
