import React from "react";
import Register from "../register/Register";
import SignOut from "../signOut/SignOut";
import Cart from "../cart/Cart";
import LightMode from "../lightMode/LightMode";
import Search from "../search/Search";
import Credit from "../credit/Credit";
import Link from "next/link";
import { useSelector } from "react-redux";
import ProfileHeader from "../profileHeader/ProfileHeader";


export default function ProductHeader() {

  const { authenticate } = useSelector(state => state.auth);
  const { cart } = useSelector(state => state.cart)

  return (
    <div className="product-header">
      <div className="product-header-wrap">
        <div className="product-header__btns-wrap">
          <div className="product-header__btns">
            {authenticate && <ProfileHeader />}
            {authenticate ? <SignOut /> : <Register />}
            {cart.contents.nodes.length ? <Cart /> : null}
            {/* <LightMode /> */}
          </div>
          <Search className="product-header__search" />
        </div>
        <Link href={`/`} shallow={true} >
          <a className="product-header__logo">
            <img className="product-header__logo__img" src={`/image/logo-type2.svg`} alt="لوگو داستانا" />
          </a>
        </Link>
      </div>
      <div className="product-header--res">
        <div className="product-header--res__box">
          <div className="product-header--res__box__top">
            <div className="product-header--res__box__top__logo">
              <Link href={`/`} shallow={true} >
                <a className="product-header__logo">
                  <img
                      className="product-header--res__box__top__logo__img"
                      src={`/image/logo-type2.svg`}
                      alt="لوگو داستانا"
                  />
                </a>
              </Link>
            </div>
            <div className="product-header--res__box__top__btns">
              {authenticate && <ProfileHeader />}
              {authenticate ? <SignOut /> : <Register />}
              {cart.contents.nodes.length ? <Cart /> : null}
            </div>
          </div>
          <div className="product-header--res__box__bot">
            <div className="product-header--res__box__bot__search">
              <Search />
            </div>
            <div className="product-header--res__box__bot__credit">
              {/* <Credit /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
