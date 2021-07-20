import Link from "next/link";
import React, { useState } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUpdatedItems, randomString, removeItemFromCart, stringToNumber } from '../../functions'
import BounceLoader from 'react-spinners/BounceLoader'
import { updateCart } from "../../redux/actions";
import { v4 } from "uuid";

export default function Cart() {

  const dispatch = useDispatch()
  const { cart, loading, error, clearCartProcessing, clearCartError } = useSelector(state => state.cart);

  const handleRemoveProductClick = (vent, cartKey, products) => {
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
    }
  }

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
                      {/* <div onClick={(event) => handleRemoveProductClick(event, item.product.node.key, cart.contents.nodes)} className="cart__item__options__dlt"> */}
                        {/* <Spinner animation="border" role="status">
                          <span className="sr-only">Loading...</span>
                        </Spinner> */}
                        {/* <img
                          className="cart__item__options__dlt__icon"
                          src={`/image/icon/Path 82.png`}
                          alt="dlt"
                        /> */}
                      {/* </div> */}
                    </div>
                  </div>
                </Dropdown.Item>
              ))
            )}
          </div>

          <div className="cart__purchase">
            <div className="cart__purchase__price">مبلغ کل: {stringToNumber(cart.total)} ت</div>
            <Link href={`/account`}>
              <button as='a' className="cart__purchase__buy">ادامه فرایند خرید</button>
            </Link>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
