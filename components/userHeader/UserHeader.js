import React from "react";
import SignOut from "../signOut/SignOut";
import Register from "../register/Register";
import Search from "../search/Search";
import Notification from "../notifications/Notifications";
import { useSelector } from "react-redux";


export default function UserHeader() {
  const { authenticate } = useSelector(state => state.auth);

  return (
    <div className="user-header-wrap">
      <div className="user-header__btns">
        {/* <LightMode /> */}
        {authenticate ? <SignOut /> : <Register/>}
        <Notification />
      </div>
      <div className="user-header__search">
        <Search />
      </div>
      <div className="user-header__logo">
        <img className="user-header__logo__img" src={`/image/LOGO tiny.svg`} alt="logo" />
      </div>
    </div>
  );
}
