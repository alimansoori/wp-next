import { printSourceLocation } from "graphql";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { stringToNumber } from "../../functions";
import { getOrders } from "../../redux/actions/order.actions";
import PN from 'persian-number'

export default function UserHistory() {

  const dispatch = useDispatch()
  const { orders, loading } = useSelector(state => state.order)

  useEffect(() => {
    dispatch(getOrders())
  }, [])

  return (
    <div className="user-history-box">
      <div className="user-history-box__header">
        <h1 className="user-history-box__header__title">:تاریخچه خرید</h1>
        <div className="fade-border-bot"></div>
      </div>
      <div className="user-history-box__list-wrap">
        {
          loading ? (
            <div style={{ textAlign: 'center' }}>
              <ClipLoader color='#26c7bf' loading={true} size={70} />
            </div>
          ) : (
            <ul className="user-history-box__list">
              {
                orders.map((order, index) => {
                  let date = new Date(order.node.date)
                  return (
                    <React.Fragment key={index}>
                      <li className="user-history-box__list__item">
                        <div className="user-history-box__list__item__box">
                          <div className="user-history-box__list__item__box__items">
                            <div className="user-history-box__list__item__box__items__date">
                              {date.toLocaleDateString('fa-IR')}
                            </div>
                            <div className="user-history-box__list__item__box__items__pics">
                              {
                                order.node.lineItems.nodes.map((item, index) => (
                                  <img
                                    key={index}
                                    className="user-history-box__list__item__box__items__pics__img"
                                    src={item.product.image.sourceUrl}
                                    alt="book"
                                  />
                                ))
                              }
                            </div>
                          </div>
                          <div className="user-history-box__list__item__box__options">
                            <div className="user-history-box__list__item__box__options__price">
                              <div>قیمت کل سفارش: {PN.convertEnToPe(stringToNumber(order.node.total))}</div>
                            </div>
                            <div className="user-history-box__list__item__box__options__factor">
                              <div>مشاهده فاکتور</div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <div className="fade-border-bot"></div>
                    </React.Fragment>
                  )
                })
              }
            </ul>
          )
        }


      </div>
    </div>
  );
}
