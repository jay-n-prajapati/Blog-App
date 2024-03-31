import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import Links from "./Links";
import { publicLinks } from "./LinkData";

const Navbar = () => {
  return (
    <nav>
      <div className="py-3 px-6 flex items-center justify-between border-b border-secondary shadow-xl">
        <div className="size-[2rem]">
          <NavLink to="/">
            <img
              src="/images/logo/blogify-logo-transparent.png"
              alt="logo "
              className="size-full"
            />
          </NavLink>
        </div>
        <div>
          <Links linkToRender={publicLinks} />
          {/* <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
