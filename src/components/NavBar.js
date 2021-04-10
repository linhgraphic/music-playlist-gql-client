import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import Register from "./Register";
import Modal from "./Modal";
import Login from "./Login";
import { AuthContext } from "../context/Auth";
import { UserContext } from "../context/User";

const NavBar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { isSubmitted, openPanel } = useContext(UserContext);
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    openPanel();
    if (name === "register") {
      setIsRegister(!isRegister);
      setIsLogin(false);
    } else if (name === "login") {
      setIsLogin(!isLogin);
      setIsRegister(false);
    }
  };
  const onLogOut = () => {
    logout();
    setIsRegister(false);
    setIsLogin(false);
  };
  const NavBar = user ? (
    <Menu pointing secondary>
      <Menu.Item
        name={user.username}
        active={activeItem === user.username}
        onClick={handleItemClick}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          active={activeItem === "login"}
          onClick={onLogOut}
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
        />
      </Menu.Menu>
    </Menu>
  );
  return (
    <div>
      {NavBar}
      <Modal isEdit={isRegister && !isSubmitted}>
        <Register />
      </Modal>
      <Modal isEdit={isLogin && !isSubmitted}>
        <Login />
      </Modal>
    </div>
  );
};

export default NavBar;
