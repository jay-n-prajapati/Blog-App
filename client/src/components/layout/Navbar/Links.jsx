import { NavLink } from "react-router-dom";
import  PropTypes  from "prop-types";

const Links = ({ linkToRender = [], children }) => {
  return (
    <ul className="w-auto flex items-center gap-2">
      {linkToRender.map((link, idx) => {
        return (
          <li key={idx}>
            <NavLink to={link.slug} className="p-2 flex items-center gap-2 font-sohne-regular text-primary-text text-[12px]">
              {link?.icon}
              <span className="hidden sm:block" >{link.label}</span>
            </NavLink>
          </li>
        );
      })}
      {children}
    </ul>
  );
};

Links.propTypes = {
  children: PropTypes.node,
  linkToRender: PropTypes.array,
};

export default Links;
