import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, ToolBar, Menu, Logo, Tab, Tabs, TabButton } from "./NavbarStyles";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <ToolBar>
        <Logo href="/">ANDROMEDA</Logo>
        <Menu onClick={() => setIsOpen(!isOpen)} />
        <Tabs isOpen={isOpen}>
          <Tab href="/">About this page</Tab>
          <Tab href="/">Launch schedule</Tab>
          <Link to='/signup'><TabButton>Sign In</TabButton></Link>
        </Tabs>
      </ToolBar>
    </Nav>
  );
};

export default Navbar;
