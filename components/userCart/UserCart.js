import React, {useEffect, useState, useRef} from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {useDispatch, useSelector} from "react-redux";
import {getUpdatedItems, stringToNumber} from "../../functions";
import {v4} from "uuid";
import {updateCart} from '../../redux/actions/cart.actions'
import PN from 'persian-number'
import {cartConstants} from "../../redux/actions/constants";

export default function UserCartourites() {
    const dispatch = useDispatch()
    const {cart, loading, error} = useSelector(state => state.cart)

    const handleRemoveProductClick = (event, cartKey, products) => {
        event.stopPropagation();

        if (products.length) {

            // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
            const newQty = 0;
            const updatedItems = getUpdatedItems(products, newQty, cartKey);

            dispatch(updateCart({
                input: {
                    clientMutationId: v4(),
                    items: updatedItems
                }
            }));
            dispatch({
                type: cartConstants.CLEAR_MESSAGE
            })
        }
    };

    const RenderCartItem = ({item}) => {
        const [value, setValue] = useState(parseInt(item.quantity))

        // useEffect(() => {
        //   if (value < 1) {
        //     setValue(1)
        //   }
        // }, [value])

        const didMount = useRef(false);
        useEffect(() => {
            if (didMount.current) {
                handleQtyChange(item.key)
            } else didMount.current = true;
            ;
        }, [value]);

        const handleQtyChange = (cartKey) => {

            if (process.browser) {

                // event.stopPropagation();

                // If the previous update cart mutation request is still processing, then return.
                if (loading) {
                    return;
                }

                // If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
                const newQty = (value) ? parseInt(value) : 1;

                // Set the new qty in state.
                // setValue(newQty);

                if (cart.contents.nodes.length) {

                    const updatedItems = getUpdatedItems(cart.contents.nodes, newQty, cartKey);

                    dispatch(
                        updateCart({
                            input: {
                                clientMutationId: v4(),
                                items: updatedItems
                            }
                        })
                    );
                }

            }
        };

        return (
            <>
                <li className="user-cart-box__list__item">
                    <div className="user-cart-box__list__item__box">
                        <div className="user-cart-box__list__item__box__items">
                            <div className="user-cart-box__list__item__box__items__pics">
                                {item.product.node.image ? (
                                    <img
                                        className="user-cart-box__list__item__box__items__pics__img"
                                        src={item.product.node.image.sourceUrl}
                                        alt={item.product.node.image.altText}
                                    />
                                ) : (
                                    <img
                                        className="user-cart-box__list__item__box__items__pics__img"
                                        src={`/image/book picture.png`}
                                        alt="book"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="user-cart-box__list__item__box__content">
                            <div className="user-cart-box__list__item__box__title">
                                {item.product.node.name}
                            </div>
                            <div className="user-cart-box__list__item__box__attrs">
                                <div className="user-cart-box__list__item__box__options">
                                    <div className="user-cart-box__list__item__box__options__title">
                                        :تعداد
                                    </div>
                                    <div className="user-cart-box__list__item__box__options__input-wrap">
                                        <div className="user-basket-box__header__content__wallet__credit__input-wrap">
                                            <button
                                                onClick={() => setValue(value + 1)}
                                                className="user-basket-box__header__content__wallet__credit__plus"
                                            >
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
                                                value={value}
                                                onChange={(e) => console.log(value)}
                                            />
                                            <button
                                                onClick={() => setValue(value - 1)}
                                                className="user-basket-box__header__content__wallet__credit__minus"
                                            >
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
                                        onClick={(event) => handleRemoveProductClick(event, item.key, cart.contents.nodes)}
                                        style={{cursor: "pointer"}}
                                        src={`/image/icon/Path 82.png`}
                                        alt="dlt"
                                    />
                                    <img
                                        className="user-cart-box__list__item__box__items__pics__img"
                                        style={{cursor: "pointer"}}
                                        src={`/image/icon/Send.png`}
                                        alt="send"
                                    />
                                </div>
                                <div className="user-cart-box__list__item__box__price">
                                    <strong className="user-cart-box__list__item__box__price__text">
                                        {PN.convertEnToPe(stringToNumber(item.total))}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <div className="fade-border-bot"></div>
            </>
        )
    }

    return (
        <div className="user-cart-baskets">
            <Tabs defaultActiveKey="purchase" id="uncontrolled-tab-example">
                <Tab eventKey="purchase" title="سبد خرید">
                    <div className="user-cart-box user-cart-box--purchase">
                        <div className="user-cart-box__header">
                            <h1 className="user-cart-box__header__title">سبد خرید</h1>
                            <div className="fade-border-bot"></div>
                        </div>
                        <div className="user-cart-box__list-wrap">
                            <ul className="user-cart-box__list">
                                {cart.contents.nodes.map((item) => <RenderCartItem key={item.key} item={item}/>)}
                            </ul>
                        </div>
                    </div>
                </Tab>
                {/*<Tab eventKey="kenare" title="سبد کناره">*/}
                {/*  <div className="user-cart-box user-cart-box--kenare">*/}
                {/*    <div className="user-cart-box__header">*/}
                {/*      <h1 className="user-cart-box__header__title">:سبد کناره</h1>*/}
                {/*      <div className="fade-border-bot"></div>*/}
                {/*    </div>*/}
                {/*    <div className="user-cart-box__list-wrap">*/}
                {/*      <ul className="user-cart-box__list">*/}
                {/*        <li className="user-cart-box__list__item">*/}
                {/*          <div className="user-cart-box__list__item__box">*/}
                {/*            <div className="user-cart-box__list__item__box__items">*/}
                {/*              <div className="user-cart-box__list__item__box__items__pics">*/}
                {/*                <img*/}
                {/*                  className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                  src={`/image/book picture.png`}*/}
                {/*                  alt="book"*/}
                {/*                />*/}
                {/*              </div>*/}
                {/*            </div>*/}
                {/*            <div className="user-cart-box__list__item__box__options">*/}
                {/*              <div className="user-cart-box__list__item__box__options__title">*/}
                {/*                :تعداد*/}
                {/*              </div>*/}
                {/*              <div className="user-cart-box__list__item__box__options__input-wrap">*/}
                {/*                <input*/}
                {/*                  className="user-cart-box__list__item__box__options__input"*/}
                {/*                  type="number"*/}
                {/*                />*/}
                {/*              </div>*/}
                {/*              <img*/}
                {/*                className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                src={`/image/icon/Path 82.png`}*/}
                {/*                alt="dlt"*/}
                {/*              />*/}
                {/*              <img*/}
                {/*                className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                src={`/image/icon/Send.png`}*/}
                {/*                alt="send"*/}
                {/*              />*/}
                {/*            </div>*/}
                {/*            <div className="user-cart-box__list__item__box__price">*/}
                {/*              <strong className="user-cart-box__list__item__box__price__text">*/}
                {/*                قیمت*/}
                {/*              </strong>*/}
                {/*            </div>*/}
                {/*          </div>*/}
                {/*        </li>*/}
                {/*        <div className="fade-border-bot"></div>*/}

                {/*        <li className="user-cart-box__list__item">*/}
                {/*          <div className="user-cart-box__list__item__box">*/}
                {/*            <div className="user-cart-box__list__item__box__items">*/}
                {/*              <div className="user-cart-box__list__item__box__items__pics">*/}
                {/*                <img*/}
                {/*                  className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                  src={`/image/book picture.png`}*/}
                {/*                  alt="book"*/}
                {/*                />*/}
                {/*              </div>*/}
                {/*            </div>*/}
                {/*            <div className="user-cart-box__list__item__box__options">*/}
                {/*              <div className="user-cart-box__list__item__box__options__title">*/}
                {/*                :تعداد*/}
                {/*              </div>*/}
                {/*              <div className="user-cart-box__list__item__box__options__input-wrap">*/}
                {/*                <input*/}
                {/*                  className="user-cart-box__list__item__box__options__input"*/}
                {/*                  type="number"*/}
                {/*                />*/}
                {/*              </div>*/}
                {/*              <img*/}
                {/*                className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                src={`/image/icon/Path 82.png`}*/}
                {/*                alt="dlt"*/}
                {/*              />*/}
                {/*              <img*/}
                {/*                className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                src={`/image/icon/Send.png`}*/}
                {/*                alt="send"*/}
                {/*              />*/}
                {/*            </div>*/}
                {/*            <div className="user-cart-box__list__item__box__price">*/}
                {/*              <strong className="user-cart-box__list__item__box__price__text">*/}
                {/*                قیمت*/}
                {/*              </strong>*/}
                {/*            </div>*/}
                {/*          </div>*/}
                {/*        </li>*/}
                {/*        <div className="fade-border-bot"></div>*/}

                {/*        <li className="user-cart-box__list__item">*/}
                {/*          <div className="user-cart-box__list__item__box">*/}
                {/*            <div className="user-cart-box__list__item__box__items">*/}
                {/*              <div className="user-cart-box__list__item__box__items__pics">*/}
                {/*                <img*/}
                {/*                  className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                  src={`/image/book picture.png`}*/}
                {/*                  alt="book"*/}
                {/*                />*/}
                {/*              </div>*/}
                {/*            </div>*/}
                {/*            <div className="user-cart-box__list__item__box__options">*/}
                {/*              <div className="user-cart-box__list__item__box__options__title">*/}
                {/*                :تعداد*/}
                {/*              </div>*/}
                {/*              <div className="user-cart-box__list__item__box__options__input-wrap">*/}
                {/*                <input*/}
                {/*                  className="user-cart-box__list__item__box__options__input"*/}
                {/*                  type="number"*/}
                {/*                />*/}
                {/*              </div>*/}
                {/*              <img*/}
                {/*                className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                src={`/image/icon/Path 82.png`}*/}
                {/*                alt="dlt"*/}
                {/*              />*/}
                {/*              <img*/}
                {/*                className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                src={`/image/icon/Send.png`}*/}
                {/*                alt="send"*/}
                {/*              />*/}
                {/*            </div>*/}
                {/*            <div className="user-cart-box__list__item__box__price">*/}
                {/*              <strong className="user-cart-box__list__item__box__price__text">*/}
                {/*                قیمت*/}
                {/*              </strong>*/}
                {/*            </div>*/}
                {/*          </div>*/}
                {/*        </li>*/}
                {/*        <div className="fade-border-bot"></div>*/}

                {/*        <li className="user-cart-box__list__item">*/}
                {/*          <div className="user-cart-box__list__item__box">*/}
                {/*            <div className="user-cart-box__list__item__box__items">*/}
                {/*              <div className="user-cart-box__list__item__box__items__pics">*/}
                {/*                <img*/}
                {/*                  className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                  src={`/image/book picture.png`}*/}
                {/*                  alt="book"*/}
                {/*                />*/}
                {/*              </div>*/}
                {/*            </div>*/}
                {/*            <div className="user-cart-box__list__item__box__options">*/}
                {/*              <div className="user-cart-box__list__item__box__options__title">*/}
                {/*                :تعداد*/}
                {/*              </div>*/}
                {/*              <div className="user-cart-box__list__item__box__options__input-wrap">*/}
                {/*                <input*/}
                {/*                  className="user-cart-box__list__item__box__options__input"*/}
                {/*                  type="number"*/}
                {/*                />*/}
                {/*              </div>*/}
                {/*              <img*/}
                {/*                className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                src={`/image/icon/Path 82.png`}*/}
                {/*                alt="dlt"*/}
                {/*              />*/}
                {/*              <img*/}
                {/*                className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                src={`/image/icon/Send.png`}*/}
                {/*                alt="send"*/}
                {/*              />*/}
                {/*            </div>*/}
                {/*            <div className="user-cart-box__list__item__box__price">*/}
                {/*              <strong className="user-cart-box__list__item__box__price__text">*/}
                {/*                قیمت*/}
                {/*              </strong>*/}
                {/*            </div>*/}
                {/*          </div>*/}
                {/*        </li>*/}
                {/*        <div className="fade-border-bot"></div>*/}

                {/*        <li className="user-cart-box__list__item">*/}
                {/*          <div className="user-cart-box__list__item__box">*/}
                {/*            <div className="user-cart-box__list__item__box__items">*/}
                {/*              <div className="user-cart-box__list__item__box__items__pics">*/}
                {/*                <img*/}
                {/*                  className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                  src={`/image/book picture.png`}*/}
                {/*                  alt="book"*/}
                {/*                />*/}
                {/*              </div>*/}
                {/*            </div>*/}
                {/*            <div className="user-cart-box__list__item__box__options">*/}
                {/*              <div className="user-cart-box__list__item__box__options__title">*/}
                {/*                :تعداد*/}
                {/*              </div>*/}
                {/*              <div className="user-cart-box__list__item__box__options__input-wrap">*/}
                {/*                <input*/}
                {/*                  className="user-cart-box__list__item__box__options__input"*/}
                {/*                  type="number"*/}
                {/*                />*/}
                {/*              </div>*/}
                {/*              <img*/}
                {/*                className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                src={`/image/icon/Path 82.png`}*/}
                {/*                alt="dlt"*/}
                {/*              />*/}
                {/*              <img*/}
                {/*                className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                src={`/image/icon/Send.png`}*/}
                {/*                alt="send"*/}
                {/*              />*/}
                {/*            </div>*/}
                {/*            <div className="user-cart-box__list__item__box__price">*/}
                {/*              <strong className="user-cart-box__list__item__box__price__text">*/}
                {/*                قیمت*/}
                {/*              </strong>*/}
                {/*            </div>*/}
                {/*          </div>*/}
                {/*        </li>*/}
                {/*        <div className="fade-border-bot"></div>*/}

                {/*        <li className="user-cart-box__list__item">*/}
                {/*          <div className="user-cart-box__list__item__box">*/}
                {/*            <div className="user-cart-box__list__item__box__items">*/}
                {/*              <div className="user-cart-box__list__item__box__items__pics">*/}
                {/*                <img*/}
                {/*                  className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                  src={`/image/book picture.png`}*/}
                {/*                  alt="book"*/}
                {/*                />*/}
                {/*              </div>*/}
                {/*            </div>*/}
                {/*            <div className="user-cart-box__list__item__box__options">*/}
                {/*              <div className="user-cart-box__list__item__box__options__title">*/}
                {/*                :تعداد*/}
                {/*              </div>*/}
                {/*              <div className="user-cart-box__list__item__box__options__input-wrap">*/}
                {/*                <input*/}
                {/*                  className="user-cart-box__list__item__box__options__input"*/}
                {/*                  type="number"*/}
                {/*                />*/}
                {/*              </div>*/}
                {/*              <img*/}
                {/*                className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                src={`/image/icon/Path 82.png`}*/}
                {/*                alt="dlt"*/}
                {/*              />*/}
                {/*              <img*/}
                {/*                className="user-cart-box__list__item__box__items__pics__img"*/}
                {/*                src={`/image/icon/Send.png`}*/}
                {/*                alt="send"*/}
                {/*              />*/}
                {/*            </div>*/}
                {/*            <div className="user-cart-box__list__item__box__price">*/}
                {/*              <strong className="user-cart-box__list__item__box__price__text">*/}
                {/*                قیمت*/}
                {/*              </strong>*/}
                {/*            </div>*/}
                {/*          </div>*/}
                {/*        </li>*/}
                {/*        <div className="fade-border-bot"></div>*/}
                {/*      </ul>*/}
                {/*    </div>*/}
                {/*    <div className="fade-border-bot"></div>*/}
                {/*    <div className="user-cart-box--kenare__btn">*/}
                {/*      <button className="user-cart-box--kenare__btn__buy">خرید</button>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</Tab>*/}
            </Tabs>
        </div>
    );
}
