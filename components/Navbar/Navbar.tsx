import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { useRouter } from "next/router";

const NavBar = () => {
  const [activeItem, setState] = useState("home");
  const router = useRouter();

  const handleItemClick = (e, { name }) => {
    setState(name);
    router.push(`/${name}`);
  };

  return (
    <div>
      <Menu pointing secondary>
        <Menu.Item
          name="books"
          active={activeItem === "home"}
          onClick={handleItemClick}
        />
      </Menu>
    </div>
  );
};
export default NavBar;
