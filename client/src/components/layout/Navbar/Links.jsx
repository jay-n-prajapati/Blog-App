import { NavLink } from "react-router-dom";
import { PropTypes } from "prop-types";

const Links = ({ linkToRender = [], children }) => {
  return (
    <ul className=" w-full md:w-auto flex flex-col md:flex-row py-4 md:py-0 items-center gap-4">
      {linkToRender.map((link, idx) => {
        return (
          <li key={idx}>
            <NavLink className="p-2 flex items-center gap-2 font-sohne-regular text-primary-text text-[14px]">
              {link?.icon}
              {link.label}
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
