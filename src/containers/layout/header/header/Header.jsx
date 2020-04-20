import React from "react";
import { useStore, connect } from "react-redux";
import { setCurrentUser } from "../../../../store/users/actions";
import HeaderLayout from "../../../../components/layout/header/Header";

const Header = ({ dispatch }) => {
  const store = useStore();
  const user = store.getState().users.currentUser;
  const headerTitle = "Tasks uni project";
  const leftLinks = [
    // { id: 1, path: "/", text: "Home", isVisible: true },
    { id: 2, path: "/tasks", text: "Tasks", isVisible: true, isLogout: false },
    { id: 3, path: "/users", text: "Users", isVisible: true, isLogout: false },
  ];
  const rightLinks = [
    {
      id: 4,
      path: "/registration",
      text: "Registration",
      isVisible: user && Object.keys(user).length === 0,
      isLogout: false,
    },
    {
      id: 5,
      path: "/login",
      text: "Login",
      isVisible: user && Object.keys(user).length === 0,
      isLogout: false,
    },
    {
      id: 6,
      path: "/logout",
      text: "Logout",
      isVisible: user && Object.keys(user).length !== 0,
      isLogout: true,
    },
  ];
  const onLogout = () => {
    dispatch(setCurrentUser({}));
    window.location.reload();
  };

  return (
    <HeaderLayout
      headerTitle={headerTitle}
      leftLinks={leftLinks}
      rightLinks={rightLinks}
      onLogout={onLogout}
    />
  );
};

export default connect()(Header);
