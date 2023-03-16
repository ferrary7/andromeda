import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav, ToolBar, Menu, Logo, Tab, Tabs, TabButton } from "./NavbarStyles";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const user = await response.json();
          setUser(user);
        } else {
          setUser(null);
        }
        console.log(user.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Nav>
      <ToolBar>
        <Logo href="/">ANDROMEDA</Logo>
        <Menu onClick={() => setIsOpen(!isOpen)} />
        <Tabs isOpen={isOpen}>
          <Tab href="/">About this page</Tab>
          <Tab href="/upcomingLaunches">Launch schedule</Tab>
          {user ? (
            <TabButton>{user.name}</TabButton>
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
