import React from "react";
import { Dropdown } from "react-bootstrap";

export default function Cart() {
  return (
    <div className="cart-btn-wrap">
      <Dropdown>
        <Dropdown.Toggle as="div" id="dropdown-cart">
          <button className="cart__btn">
            <img className="cart__btn__icon" src={`/image/icon/Basket.svg`} alt="cart" />
            <div className="cart__btn__title">سبد خرید</div>
          </button>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div className="cart__item-wrap">
            <Dropdown.Item href="#/action-1">
              <div className="cart__item">
                <div className="cart__item__pic">
                  <img className="cart__item__pic__img" src={`/image/book picture.png`} alt="book" />
                </div>
                <div className="cart__item__details">
                  <div className="cart__item__details__name">نام کتاب</div>
                  <div className="cart__item__details__price">29900 ت</div>
                </div>
                <div className="cart__item__options">
                  <div className="cart__item__options__number">تعداد: 2</div>
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
            <Dropdown.Item href="#/action-1">
              <div className="cart__item">
                <div className="cart__item__pic">
                  <img className="cart__item__pic__img" src={`/image/book picture.png`} alt="book" />
                </div>
                <div className="cart__item__details">
                  <div className="cart__item__details__name">نام کتاب</div>
                  <div className="cart__item__details__price">29900 ت</div>
                </div>
                <div className="cart__item__options">
                  <div className="cart__item__options__number">تعداد: 2</div>
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
            <Dropdown.Item href="#/action-1">
              <div className="cart__item">
                <div className="cart__item__pic">
                  <img className="cart__item__pic__img" src={`/image/book picture.png`} alt="book" />
                </div>
                <div className="cart__item__details">
                  <div className="cart__item__details__name">نام کتاب</div>
                  <div className="cart__item__details__price">29900 ت</div>
                </div>
                <div className="cart__item__options">
                  <div className="cart__item__options__number">تعداد: 2</div>
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
            <Dropdown.Item href="#/action-1">
              <div className="cart__item">
                <div className="cart__item__pic">
                  <img className="cart__item__pic__img" src={`/image/book picture.png`} alt="book" />
                </div>
                <div className="cart__item__details">
                  <div className="cart__item__details__name">نام کتاب</div>
                  <div className="cart__item__details__price">29900 ت</div>
                </div>
                <div className="cart__item__options">
                  <div className="cart__item__options__number">تعداد: 2</div>
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
          </div>

          <div className="cart__purchase">
            <div className="cart__purchase__price">مبلغ کل: 29900 ت</div>
            <button className="cart__purchase__buy">ادامه فرایند خرید</button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
