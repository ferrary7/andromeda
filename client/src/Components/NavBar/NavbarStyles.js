import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";

export const Nav = styled.nav`
  background-color: black;
`;

export const ToolBar = styled.div`
  padding: 1rem 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  transition: all 0.3s linear;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0px")};
  }
`;

export const Tab = styled.a`
  padding: 1rem 2rem;
  text-align: center;
  color: white;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  &:hover {
    transform: scale(1.1);
}
`;

export const TabButton = styled.button`
  padding: 0.5rem 1rem;
  width: 120px;
  text-align: center;
  color: white;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  border: 3px solid #7A38B2;
  border-radius: 20px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

export const Logo = styled.a`
  display: inline-block;
  color: white;
  text-decoration: none;
  font-size: 30px;
  font-weight: bold;
`;




export const Menu = styled(MenuIcon)`
  cursor: pointer;
  display: none !important;
  color: white;

  @media (max-width: 768px) {
    display: flex !important;
  }
`;