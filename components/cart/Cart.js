import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { randomString, stringToNumber } from '../../functions'

export default function Cart() {

  const { cart, loading, error, clearCartProcessing, clearCartError } = useSelector(state => state.cart);

  return (
    <div className="cart-btn-wrap">
      <Dropdown>
        <Dropdown.Toggle as="div" id="dropdown-cart">
          <button className="cart__btn">
            <img className="cart__btn__icon" src={`/image/icon/Basket.svg`} alt="cart" />
            <div className="cart__btn__title">سبد خرید</div>
          </button>
        </Dropdown.Toggle>

        <Dropdown.Menu >
          <div className="cart__item-wrap">
            {cart.contents.nodes.length && (
              cart.contents.nodes.map(item => (
                <Dropdown.Item
                  eventKey={item.product.node.productId}
                  key={item.product.node.productId + randomString()}
                >
                  <div className="cart__item">
                    <div className="cart__item__pic">
                      <img className="cart__item__pic__img" src={`/image/book picture.png`} alt="book" />
                    </div>
                    <div className="cart__item__details">
                      <div className="cart__item__details__name">{item.product.node.name}</div>
                      <div className="cart__item__details__price">{`ت ${stringToNumber(item.product.node.price)}`}</div>
                    </div>
                    <div className="cart__item__options">
                      <div className="cart__item__options__number">تعداد: {item.quantity}</div>
                      <div className="cart__item__options__dlt">
                        <img
                          className="cart__item__options__dlt__icon"
                          src={`/image/icon/Path 82.png`}
                          alt="cart"
                        />
                      </div>
                    </div>
                  </div>
                </Dropdown.Item>
              ))
            )}
          </div>

          <div className="cart__purchase">
            <div className="cart__purchase__price">مبلغ کل: {stringToNumber(cart.total)} ت</div>
            <button className="cart__purchase__buy">ادامه فرایند خرید</button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
