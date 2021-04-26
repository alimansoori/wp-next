import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export default function UserCartourites() {
  return (
    <div className="user-cart-baskets">
      <Tabs defaultActiveKey="purchase" id="uncontrolled-tab-example">
        <Tab eventKey="purchase" title="سبد خرید">
          <div className="user-cart-box user-cart-box--purchase">
            <div className="user-cart-box__header">
              <h1 className="user-cart-box__header__title">:سبد خرید</h1>
              <div className="fade-border-bot"></div>
            </div>
            <div className="user-cart-box__list-wrap">
              <ul className="user-cart-box__list">
                <li className="user-cart-box__list__item">
                  <div className="user-cart-box__list__item__box">
                    <div className="user-cart-box__list__item__box__items">
                      <div className="user-cart-box__list__item__box__items__pics">
                        <img
                          className="user-cart-box__list__item__box__items__pics__img"
                          src={`/image/book picture.png`}
                          alt="book"
                        />
                      </div>
                    </div>
                    <div className="user-cart-box__list__item__box__options">
                      <div className="user-cart-box__list__item__box__options__title">
                        :تعداد
                      </div>
                      <div className="user-cart-box__list__item__box__options__input-wrap">
                        <div className="user-basket-box__header__content__wallet__credit__input-wrap">
                          <button className="user-basket-box__header__content__wallet__credit__plus">
                            <img
                              className="user-basket-box__header__content__wallet__credit__plus__icon"
                              src={`/image/icon/PLUS.png`}
                              alt="plus"
                            />
                          </button>
                          <input
                            className="user-basket-box__header__content__wallet__credit__input"
                            type="text"
                            placeholder=""
                          />
                          <button className="user-basket-box__header__content__wallet__credit__minus">
                            <img
                              className="user-basket-box__header__content__wallet__credit__minus__icon"
                              src={`/image/icon/Rectangle 132.png`}
                              alt="minus"
                            />
                          </button>
                        </div>
                      </div>
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Path 82.png`}
                        alt="dlt"
                      />
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Send.png`}
                        alt="send"
                      />
                    </div>
                    <div className="user-cart-box__list__item__box__price">
                      <strong className="user-cart-box__list__item__box__price__text">
                        قیمت
                      </strong>
                    </div>
                  </div>
                </li>
                <div className="fade-border-bot"></div>

                <li className="user-cart-box__list__item">
                  <div className="user-cart-box__list__item__box">
                    <div className="user-cart-box__list__item__box__items">
                      <div className="user-cart-box__list__item__box__items__pics">
                        <img
                          className="user-cart-box__list__item__box__items__pics__img"
                          src={`/image/book picture.png`}
                          alt="book"
                        />
                      </div>
                    </div>
                    <div className="user-cart-box__list__item__box__options">
                      <div className="user-cart-box__list__item__box__options__title">
                        :تعداد
                      </div>
                      <div className="user-cart-box__list__item__box__options__input-wrap">
                        <div className="user-basket-box__header__content__wallet__credit__input-wrap">
                          <button className="user-basket-box__header__content__wallet__credit__plus">
                            <img
                              className="user-basket-box__header__content__wallet__credit__plus__icon"
                              src={`/image/icon/PLUS.png`}
                              alt="plus"
                            />
                          </button>
                          <input
                            className="user-basket-box__header__content__wallet__credit__input"
                            type="text"
                            placeholder=""
                          />
                          <button className="user-basket-box__header__content__wallet__credit__minus">
                            <img
                              className="user-basket-box__header__content__wallet__credit__minus__icon"
                              src={`/image/icon/Rectangle 132.png`}
                              alt="minus"
                            />
                          </button>
                        </div>
                      </div>
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Path 82.png`}
                        alt="dlt"
                      />
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Send.png`}
                        alt="send"
                      />
                    </div>
                    <div className="user-cart-box__list__item__box__price">
                      <strong className="user-cart-box__list__item__box__price__text">
                        قیمت
                      </strong>
                    </div>
                  </div>
                </li>
                <div className="fade-border-bot"></div>

                <li className="user-cart-box__list__item">
                  <div className="user-cart-box__list__item__box">
                    <div className="user-cart-box__list__item__box__items">
                      <div className="user-cart-box__list__item__box__items__pics">
                        <img
                          className="user-cart-box__list__item__box__items__pics__img"
                          src={`/image/book picture.png`}
                          alt="book"
                        />
                      </div>
                    </div>
                    <div className="user-cart-box__list__item__box__options">
                      <div className="user-cart-box__list__item__box__options__title">
                        :تعداد
                      </div>
                      <div className="user-cart-box__list__item__box__options__input-wrap">
                        <div className="user-basket-box__header__content__wallet__credit__input-wrap">
                          <button className="user-basket-box__header__content__wallet__credit__plus">
                            <img
                              className="user-basket-box__header__content__wallet__credit__plus__icon"
                              src={`/image/icon/PLUS.png`}
                              alt="plus"
                            />
                          </button>
                          <input
                            className="user-basket-box__header__content__wallet__credit__input"
                            type="text"
                            placeholder=""
                          />
                          <button className="user-basket-box__header__content__wallet__credit__minus">
                            <img
                              className="user-basket-box__header__content__wallet__credit__minus__icon"
                              src={`/image/icon/Rectangle 132.png`}
                              alt="minus"
                            />
                          </button>
                        </div>
                      </div>
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Path 82.png`}
                        alt="dlt"
                      />
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Send.png`}
                        alt="send"
                      />
                    </div>
                    <div className="user-cart-box__list__item__box__price">
                      <strong className="user-cart-box__list__item__box__price__text">
                        قیمت
                      </strong>
                    </div>
                  </div>
                </li>
                <div className="fade-border-bot"></div>

                <li className="user-cart-box__list__item">
                  <div className="user-cart-box__list__item__box">
                    <div className="user-cart-box__list__item__box__items">
                      <div className="user-cart-box__list__item__box__items__pics">
                        <img
                          className="user-cart-box__list__item__box__items__pics__img"
                          src={`/image/book picture.png`}
                          alt="book"
                        />
                      </div>
                    </div>
                    <div className="user-cart-box__list__item__box__options">
                      <div className="user-cart-box__list__item__box__options__title">
                        :تعداد
                      </div>
                      <div className="user-cart-box__list__item__box__options__input-wrap">
                        <div className="user-basket-box__header__content__wallet__credit__input-wrap">
                          <button className="user-basket-box__header__content__wallet__credit__plus">
                            <img
                              className="user-basket-box__header__content__wallet__credit__plus__icon"
                              src={`/image/icon/PLUS.png`}
                              alt="plus"
                            />
                          </button>
                          <input
                            className="user-basket-box__header__content__wallet__credit__input"
                            type="text"
                            placeholder=""
                          />
                          <button className="user-basket-box__header__content__wallet__credit__minus">
                            <img
                              className="user-basket-box__header__content__wallet__credit__minus__icon"
                              src={`/image/icon/Rectangle 132.png`}
                              alt="minus"
                            />
                          </button>
                        </div>
                      </div>
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Path 82.png`}
                        alt="dlt"
                      />
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Send.png`}
                        alt="send"
                      />
                    </div>
                    <div className="user-cart-box__list__item__box__price">
                      <strong className="user-cart-box__list__item__box__price__text">
                        قیمت
                      </strong>
                    </div>
                  </div>
                </li>
                <div className="fade-border-bot"></div>

                <li className="user-cart-box__list__item">
                  <div className="user-cart-box__list__item__box">
                    <div className="user-cart-box__list__item__box__items">
                      <div className="user-cart-box__list__item__box__items__pics">
                        <img
                          className="user-cart-box__list__item__box__items__pics__img"
                          src={`/image/book picture.png`}
                          alt="book"
                        />
                      </div>
                    </div>
                    <div className="user-cart-box__list__item__box__options">
                      <div className="user-cart-box__list__item__box__options__title">
                        :تعداد
                      </div>
                      <div className="user-cart-box__list__item__box__options__input-wrap">
                        <div className="user-basket-box__header__content__wallet__credit__input-wrap">
                          <button className="user-basket-box__header__content__wallet__credit__plus">
                            <img
                              className="user-basket-box__header__content__wallet__credit__plus__icon"
                              src={`/image/icon/PLUS.png`}
                              alt="plus"
                            />
                          </button>
                          <input
                            className="user-basket-box__header__content__wallet__credit__input"
                            type="text"
                            placeholder=""
                          />
                          <button className="user-basket-box__header__content__wallet__credit__minus">
                            <img
                              className="user-basket-box__header__content__wallet__credit__minus__icon"
                              src={`/image/icon/Rectangle 132.png`}
                              alt="minus"
                            />
                          </button>
                        </div>
                      </div>
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Path 82.png`}
                        alt="dlt"
                      />
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Send.png`}
                        alt="send"
                      />
                    </div>
                    <div className="user-cart-box__list__item__box__price">
                      <strong className="user-cart-box__list__item__box__price__text">
                        قیمت
                      </strong>
                    </div>
                  </div>
                </li>
                <div className="fade-border-bot"></div>

                <li className="user-cart-box__list__item">
                  <div className="user-cart-box__list__item__box">
                    <div className="user-cart-box__list__item__box__items">
                      <div className="user-cart-box__list__item__box__items__pics">
                        <img
                          className="user-cart-box__list__item__box__items__pics__img"
                          src={`/image/book picture.png`}
                          alt="book"
                        />
                      </div>
                    </div>
                    <div className="user-cart-box__list__item__box__options">
                      <div className="user-cart-box__list__item__box__options__title">
                        :تعداد
                      </div>
                      <div className="user-cart-box__list__item__box__options__input-wrap">
                        <div className="user-basket-box__header__content__wallet__credit__input-wrap">
                          <button className="user-basket-box__header__content__wallet__credit__plus">
                            <img
                              className="user-basket-box__header__content__wallet__credit__plus__icon"
                              src={`/image/icon/PLUS.png`}
                              alt="plus"
                            />
                          </button>
                          <input
                            className="user-basket-box__header__content__wallet__credit__input"
                            type="text"
                            placeholder=""
                          />
                          <button className="user-basket-box__header__content__wallet__credit__minus">
                            <img
                              className="user-basket-box__header__content__wallet__credit__minus__icon"
                              src={`/image/icon/Rectangle 132.png`}
                              alt="minus"
                            />
                          </button>
                        </div>
                      </div>
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Path 82.png`}
                        alt="dlt"
                      />
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Send.png`}
                        alt="send"
                      />
                    </div>
                    <div className="user-cart-box__list__item__box__price">
                      <strong className="user-cart-box__list__item__box__price__text">
                        قیمت
                      </strong>
                    </div>
                  </div>
                </li>
                <div className="fade-border-bot"></div>
              </ul>
            </div>
          </div>
        </Tab>
        <Tab eventKey="kenare" title="سبد کناره">
          <div className="user-cart-box user-cart-box--kenare">
            <div className="user-cart-box__header">
              <h1 className="user-cart-box__header__title">:سبد کناره</h1>
              <div className="fade-border-bot"></div>
            </div>
            <div className="user-cart-box__list-wrap">
              <ul className="user-cart-box__list">
                <li className="user-cart-box__list__item">
                  <div className="user-cart-box__list__item__box">
                    <div className="user-cart-box__list__item__box__items">
                      <div className="user-cart-box__list__item__box__items__pics">
                        <img
                          className="user-cart-box__list__item__box__items__pics__img"
                          src={`/image/book picture.png`}
                          alt="book"
                        />
                      </div>
                    </div>
                    <div className="user-cart-box__list__item__box__options">
                      <div className="user-cart-box__list__item__box__options__title">
                        :تعداد
                      </div>
                      <div className="user-cart-box__list__item__box__options__input-wrap">
                        <input
                          className="user-cart-box__list__item__box__options__input"
                          type="number"
                        />
                      </div>
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Path 82.png`}
                        alt="dlt"
                      />
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Send.png`}
                        alt="send"
                      />
                    </div>
                    <div className="user-cart-box__list__item__box__price">
                      <strong className="user-cart-box__list__item__box__price__text">
                        قیمت
                      </strong>
                    </div>
                  </div>
                </li>
                <div className="fade-border-bot"></div>

                <li className="user-cart-box__list__item">
                  <div className="user-cart-box__list__item__box">
                    <div className="user-cart-box__list__item__box__items">
                      <div className="user-cart-box__list__item__box__items__pics">
                        <img
                          className="user-cart-box__list__item__box__items__pics__img"
                          src={`/image/book picture.png`}
                          alt="book"
                        />
                      </div>
                    </div>
                    <div className="user-cart-box__list__item__box__options">
                      <div className="user-cart-box__list__item__box__options__title">
                        :تعداد
                      </div>
                      <div className="user-cart-box__list__item__box__options__input-wrap">
                        <input
                          className="user-cart-box__list__item__box__options__input"
                          type="number"
                        />
                      </div>
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Path 82.png`}
                        alt="dlt"
                      />
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Send.png`}
                        alt="send"
                      />
                    </div>
                    <div className="user-cart-box__list__item__box__price">
                      <strong className="user-cart-box__list__item__box__price__text">
                        قیمت
                      </strong>
                    </div>
                  </div>
                </li>
                <div className="fade-border-bot"></div>

                <li className="user-cart-box__list__item">
                  <div className="user-cart-box__list__item__box">
                    <div className="user-cart-box__list__item__box__items">
                      <div className="user-cart-box__list__item__box__items__pics">
                        <img
                          className="user-cart-box__list__item__box__items__pics__img"
                          src={`/image/book picture.png`}
                          alt="book"
                        />
                      </div>
                    </div>
                    <div className="user-cart-box__list__item__box__options">
                      <div className="user-cart-box__list__item__box__options__title">
                        :تعداد
                      </div>
                      <div className="user-cart-box__list__item__box__options__input-wrap">
                        <input
                          className="user-cart-box__list__item__box__options__input"
                          type="number"
                        />
                      </div>
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Path 82.png`}
                        alt="dlt"
                      />
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Send.png`}
                        alt="send"
                      />
                    </div>
                    <div className="user-cart-box__list__item__box__price">
                      <strong className="user-cart-box__list__item__box__price__text">
                        قیمت
                      </strong>
                    </div>
                  </div>
                </li>
                <div className="fade-border-bot"></div>

                <li className="user-cart-box__list__item">
                  <div className="user-cart-box__list__item__box">
                    <div className="user-cart-box__list__item__box__items">
                      <div className="user-cart-box__list__item__box__items__pics">
                        <img
                          className="user-cart-box__list__item__box__items__pics__img"
                          src={`/image/book picture.png`}
                          alt="book"
                        />
                      </div>
                    </div>
                    <div className="user-cart-box__list__item__box__options">
                      <div className="user-cart-box__list__item__box__options__title">
                        :تعداد
                      </div>
                      <div className="user-cart-box__list__item__box__options__input-wrap">
                        <input
                          className="user-cart-box__list__item__box__options__input"
                          type="number"
                        />
                      </div>
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Path 82.png`}
                        alt="dlt"
                      />
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Send.png`}
                        alt="send"
                      />
                    </div>
                    <div className="user-cart-box__list__item__box__price">
                      <strong className="user-cart-box__list__item__box__price__text">
                        قیمت
                      </strong>
                    </div>
                  </div>
                </li>
                <div className="fade-border-bot"></div>

                <li className="user-cart-box__list__item">
                  <div className="user-cart-box__list__item__box">
                    <div className="user-cart-box__list__item__box__items">
                      <div className="user-cart-box__list__item__box__items__pics">
                        <img
                          className="user-cart-box__list__item__box__items__pics__img"
                          src={`/image/book picture.png`}
                          alt="book"
                        />
                      </div>
                    </div>
                    <div className="user-cart-box__list__item__box__options">
                      <div className="user-cart-box__list__item__box__options__title">
                        :تعداد
                      </div>
                      <div className="user-cart-box__list__item__box__options__input-wrap">
                        <input
                          className="user-cart-box__list__item__box__options__input"
                          type="number"
                        />
                      </div>
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Path 82.png`}
                        alt="dlt"
                      />
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Send.png`}
                        alt="send"
                      />
                    </div>
                    <div className="user-cart-box__list__item__box__price">
                      <strong className="user-cart-box__list__item__box__price__text">
                        قیمت
                      </strong>
                    </div>
                  </div>
                </li>
                <div className="fade-border-bot"></div>

                <li className="user-cart-box__list__item">
                  <div className="user-cart-box__list__item__box">
                    <div className="user-cart-box__list__item__box__items">
                      <div className="user-cart-box__list__item__box__items__pics">
                        <img
                          className="user-cart-box__list__item__box__items__pics__img"
                          src={`/image/book picture.png`}
                          alt="book"
                        />
                      </div>
                    </div>
                    <div className="user-cart-box__list__item__box__options">
                      <div className="user-cart-box__list__item__box__options__title">
                        :تعداد
                      </div>
                      <div className="user-cart-box__list__item__box__options__input-wrap">
                        <input
                          className="user-cart-box__list__item__box__options__input"
                          type="number"
                        />
                      </div>
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Path 82.png`}
                        alt="dlt"
                      />
                      <img
                        className="user-cart-box__list__item__box__items__pics__img"
                        src={`/image/icon/Send.png`}
                        alt="send"
                      />
                    </div>
                    <div className="user-cart-box__list__item__box__price">
                      <strong className="user-cart-box__list__item__box__price__text">
                        قیمت
                      </strong>
                    </div>
                  </div>
                </li>
                <div className="fade-border-bot"></div>
              </ul>
            </div>
            <div className="fade-border-bot"></div>
            <div className="user-cart-box--kenare__btn">
              <button className="user-cart-box--kenare__btn__buy">خرید</button>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
