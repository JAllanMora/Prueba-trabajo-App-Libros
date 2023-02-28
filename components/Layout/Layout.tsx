import React from "react";
import NavBar from "../Navbar/Navbar";
import { Divider } from "semantic-ui-react";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <NavBar />
      <Divider />
      {children}
    </div>
  );
};

export default Layout;
