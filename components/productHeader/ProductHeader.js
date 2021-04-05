import React from "react";
import Register from "../register/Register";
import Cart from "../cart/Cart";
import LightMode from "../lightMode/LightMode";
import Search from "../search/Search";
import Credit from "../credit/Credit";
import Link from "next/link";


export default function ProductHeader() {
  return (
    <div className="product-header">
      <div className="product-header-wrap">
        <div className="product-header__btns-wrap">
          <div className="product-header__btns">
            <Register />
            <Cart />
            <LightMode />
          </div>
          <Search className="product-header__search" />
        </div>
        <Link href={`/`} >
          <a className="product-header__logo">
            <img className="product-header__logo__img" src={`/image/LOGO TYPE 2.png`} alt="logo" />
          </a>
        </Link>
      </div>
      <div className="product-header--res">
        <div className="product-header--res__box">
          <div className="product-header--res__box__top">
            <div className="product-header--res__box__top__logo">
              <img
                className="product-header--res__box__top__logo__img"
                src={`/image/LOGO TYPE 2.png`}
                alt="logo"
              />
            </div>
            <div className="product-header--res__box__top__btns">
              <Register />
              <Cart />
            </div>
          </div>
          <div className="product-header--res__box__bot">
            <div className="product-header--res__box__bot__search">
              <Search />
            </div>
            <div className="product-header--res__box__bot__credit">
              <Credit />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
