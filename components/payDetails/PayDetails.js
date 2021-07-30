import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { stringToNumber } from "../../functions";
import PN from 'persian-number'

export default function PayDetails(props) {
  const { data, order } = props

  const router = useRouter()

  const datePaid = (new Date(order?.datePaid)).toLocaleDateString('fa-IR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  const RenderDateShipping = () => {
    let text = ''
    let shippingDate = order.metaData.find((meta) => (meta.key === 'shippingDate'))
    let shippingHour = order.metaData.find((meta) => (meta.key === 'shippingHour'))

    if (shippingDate) {
      let parseDate = JSON.parse(shippingDate?.value)

      text = text + parseDate?.shippingDate?.date + ' - ' + parseDate?.shippingDate?.day
    }
    if (shippingHour) {
      text = text + ' -  ' + shippingHour?.value
    }
    return (
      <>
        {text}
      </>
    )
  }

  return (
    <div className="pay-details-box">
      {data?.data?.code === 100 && (
        <Alert style={{ direction: 'rtl' }} variant={`success`}>
          {`پرداخت شما با موفقیت انجام شد`}
        </Alert>
      )}
      {data?.data?.code === 101 && (
        <Alert style={{ direction: 'rtl' }} variant={`success`}>
          {`پرداخت شما با موفقیت انجام شد. برای مشاهده جزئیات به حساب کاربری خود به بخش تاریخچه خرید مراجعه بفرمائید.`}
        </Alert>
      )}
      {data?.errors?.code === -51 && (
        <Alert style={{ direction: 'rtl' }} variant={`danger`}>
          {`پرداخت ناموفق`}
        </Alert>
      )}
      {data?.errors?.code === -50 && (
        <Alert style={{ direction: 'rtl' }} variant={`danger`}>
          {`مبلغ پرداخت شده با مقدار مبلغ در وریفای متفاوت است`}
        </Alert>
      )}
      {data?.errors?.code === -52 && (
        <Alert style={{ direction: 'rtl' }} variant={`danger`}>
          {`خطای غیر منتظره با پشتیبانی تماس بگیرید`}
        </Alert>
      )}
      {data?.errors?.code === -53 && (
        <Alert style={{ direction: 'rtl' }} variant={`danger`}>
          {`اتوریتی برای این مرچنت کد نیست`}
        </Alert>
      )}
      {data?.errors?.code === -54 && (
        <Alert style={{ direction: 'rtl' }} variant={`danger`}>
          {`اتوریتی نامعتبر است`}
        </Alert>
      )}
      {data?.errors?.code === -9 && (
        <Alert style={{ direction: 'rtl' }} variant={`danger`}>
          {`خطای اعتبار سنجی`}
        </Alert>
      )}

      {order && (
        <>
          <div className="pay-details-box__top">
            <div className="pay-details-box__top__row">
              <div className="pay-details-box__top__row__box">
                <div className="pay-details-box__top__row__box__title">
                  <h3 className="pay-details-box__top__row__box__title__text">
                    {`کد سفارش`}
                  </h3>
                </div>
                <div className="pay-details-box__top__row__box__body">
                  {order.orderNumber}
                </div>
              </div>
              <div className="pay-details-box__top__row__box">
                <div className="pay-details-box__top__row__box__title">
                  <h3 className="pay-details-box__top__row__box__title__text">
                    {`تاریخ ثبت سفارش`}
                  </h3>
                </div>
                <div className="pay-details-box__top__row__box__body">
                  {datePaid}
                </div>
              </div>
            </div>
            <div className="pay-details-box__top__row">
              <div className="pay-details-box__top__row__box">
                <div className="pay-details-box__top__row__box__title">
                  <h3 className="pay-details-box__top__row__box__title__text">
                    {`تحویل گیرنده`}
                  </h3>
                </div>
                <div className="pay-details-box__top__row__box__body">
                  {order.billing.firstName + ' ' + order.billing.lastName}
                </div>
              </div>
              <div className="pay-details-box__top__row__box">
                <div className="pay-details-box__top__row__box__title">
                  <h3 className="pay-details-box__top__row__box__title__text">
                    {`شماره تماس`}
                  </h3>
                </div>
                <div className="pay-details-box__top__row__box__body">
                  {order.billing.phone}
                </div>
              </div>
            </div>
          </div>
          <div className="pay-details-box__header">

            <div className="pay-details-box__header__content">
              <h1 style={{ direction: 'rtl' }} className="pay-details-box__title">{`هزینه ارسال مرسوله:`}</h1>
              <div className="pay-details-box__header__content__price">
                <h2 className="pay-details-box__header__content__price__text">
                  {PN.convertEnToPe(stringToNumber(order.shippingTotal))}
                </h2>
              </div>
            </div>
            <div className="pay-details-box__header__content">
              <h1 style={{ direction: 'rtl' }} className="pay-details-box__title">{`مبلغ کل:`}</h1>
              <div className="pay-details-box__header__content__price">
                <h2 className="pay-details-box__header__content__price__text">
                  {PN.convertEnToPe(stringToNumber(order.total))}
                </h2>
              </div>
            </div>
          </div>
          <div className="pay-details-box__address">
            <h1 className="pay-details-box__title">:ارسال به</h1>
            <p className="pay-details-box__address__text">
              {'ایران' + '-' + order.billing.state + '-' + order.billing.city + '-' + order.billing.address1 + '-' + order.billing.address2}
            </p>
          </div>
          <div className="pay-details-box__address">
            <h1 className="pay-details-box__title">روش ارسال</h1>
            <p className="pay-details-box__address__text">
              {order.shippingLines && (
                <span>{order.shippingLines.nodes[0].methodTitle}</span>
              )}
            </p>
          </div>
          <div className="pay-details-box__address">
            <h1 className="pay-details-box__title">:زمان تحویل مرسوله</h1>
            <p className="pay-details-box__address__text">
              <RenderDateShipping />
            </p>
          </div>
        </>
      )}
      <div className="pay-details-box__purchase">
        <div className="pay-details-box__purchase__btn-wrap">
          <button onClick={() => router.push('/')} className="pay-details-box__purchase__btn" type="submit">
            {`رفتن به صفحه اصلی`}
          </button>
        </div>
      </div>
    </div>
  );
}
