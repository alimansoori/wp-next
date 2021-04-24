import React from "react";
import { useDispatch } from "react-redux";
import { signout } from "../../redux/actions/auth.actions";

export default function SignOut() {

  const dispatch = useDispatch()

  const logout = () => {
    dispatch(signout());
  }

  return (
    <div className="sign-out-wrap">
      <button onClick={logout} className="sign-out">خروج از حساب کاربری</button>
    </div>
  );
}
