import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Nav,
  ToolBar,
  Menu,
  Logo,
  Tab,
  Tabs,
  TabButton,
  LogoutButton,
} from "./NavbarStyles";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      const firstSpaceIndex = storedUserName.indexOf(" ");
      const extractedUserName =
        firstSpaceIndex !== -1
          ? storedUserName.substring(0, firstSpaceIndex)
          : storedUserName;
      setUserName(extractedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserName("");
    setShowLogout(false);
  };

  return (
    <Nav>
      <ToolBar>
        <Logo href="/">ANDROMEDA</Logo>
        <Menu onClick={() => setIsOpen(!isOpen)} />
        <Tabs isOpen={isOpen}>
          <Tab href="/">About this page</Tab>
          <Tab href="/upcomingLaunches">Launch schedule</Tab>
          {userName ? (
            <TabButton
              onMouseEnter={() => setShowLogout(true)}
              onMouseLeave={() => setShowLogout(false)}
            >
              {showLogout ? "" : userName}
              {showLogout && (
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              )}
            </TabButton>
          ) : (
            <Link to="/users/signup">
              <TabButton>Sign Up</TabButton>
            </Link>
          )}
        </Tabs>
      </ToolBar>
    </Nav>
  );
};

export default Navbar;
