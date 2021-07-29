import React, { useEffect, useState } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUpdatedItems, randomString, removeItemFromCart, stringToNumber } from '../../functions'
import { updateCart } from "../../redux/actions";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import SignInModal from '../signInModal/SignInModal';
import PN from 'persian-number'

export default function Cart() {

  const dispatch = useDispatch()
  const router = useRouter()
  const [modalShow, setModalShow] = useState(false);
  const [dropDownShow, setDropDownShow] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);
  const { cart, loading: cartLoading, error, clearCartProcessing, clearCartError } = useSelector(state => state.cart);
  const { authenticate } = useSelector(state => state.auth);

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
    }
  }

  const handlePayCart = () => {
    if (authenticate) {
      router.push('/account')
    } else {
      // setRedirectTo('/account')
      setDropDownShow(false)
      setModalShow(true)
    }
  }

  const handleOnHideSignInModal = () => {
    setRedirectTo('/account')
    setModalShow(false)
  }

  const handleOnToggle = (isOpen) => {
    setDropDownShow(isOpen)
  }

  return (
    <div className="cart-btn-wrap">
      <Dropdown show={dropDownShow} onToggle={handleOnToggle} >
        <Dropdown.Toggle /*onClick={() => setDropDownShow(!dropDownShow)}*/ as="div" id="dropdown-cart">
          <button className="cart__btn">
            <img className="cart__btn__icon" src={`/image/icon/Basket.svg`} alt="cart" />
            <div className="cart__btn__title">سبد خرید</div>
          </button>
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ width: '450px' }} >
          <div className="cart__item-wrap">
            {
              cartLoading && (
                <div style={{ textAlign: 'center' }}>
                  <Spinner size='sm' animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              )
            }
            {cart.contents.nodes.length && (
              cart.contents.nodes.map(item => (
                <Dropdown.ItemText
                  // eventKey={item.product.node.productId}
                  key={item.product.node.productId + randomString()}
                >
                  <div className="cart__item">
                    <div className="cart__item__pic">
                      {item.product.node.image ? (
                        <img className="cart__item__pic__img" src={item.product.node.image.sourceUrl} alt={item.product.node.image.altText} />
                      ): (
                        <img className = "cart__item__pic__img" src = {`/image/book picture.png`} alt="book cart" />
                      )}
                    </div>
                    <div className="cart__item__details">
                      <div className="cart__item__details__name">{item.product.node.name}</div>
                      <div className="cart__item__details__price">{`${PN.convertEnToPe(stringToNumber(item.product.node.price))}`}</div>
                    </div>
                    <div className="cart__item__options">
                      <div className="cart__item__options__number">تعداد: {item.quantity}</div>
                      <div onClick={(event) => handleRemoveProductClick(event, item.key, cart.contents.nodes)} className="cart__item__options__dlt">
                        {/* {cartLoading ? (
                          <Spinner size='sm' animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                          </Spinner>
                        ) : (
                          <img
                            className="cart__item__options__dlt__icon"
                            src={`/image/icon/Path 82.png`}
                            alt="dlt"
                          />
                        )} */}
                        <img
                          className="cart__item__options__dlt__icon"
                          src={`/image/icon/Path 82.png`}
                          alt="dlt"
                        />
                      </div>
                    </div>
                  </div>
                </Dropdown.ItemText>
              ))
            )}
          </div>

          <div className="cart__purchase">
            <div className="cart__purchase__price">مبلغ کل: {PN.convertEnToPe(stringToNumber(cart.total))}</div>
            <button onClick={handlePayCart} className="cart__purchase__buy">ادامه فرایند خرید</button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
      <SignInModal show={modalShow} onHide={handleOnHideSignInModal} redirectto={redirectTo} />
    </div>
  );
}
