import { NavLink } from "react-router-dom";

const Links = ({ linkToRender }) => {
  return (
    <ul className="flex items-center gap-4">
      {linkToRender.map((link, idx) => {
        return (
          <li key={idx}>
            <NavLink>{link.label}</NavLink>
          </li>
        );
      })}
    </ul>
  );
};



export default Links;
