import React from 'react'

function WalletCredit() {

    return (
        <div className="user-basket-box__header__content__wallet__credit">
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
            <button className="user-basket-box__header__content__wallet__credit__btn">
                <img
                    className="user-basket-box__header__content__wallet__credit__btn__icon"
                    src={`/image/icon/Group 137.png`}
                    alt="wallet"
                />
            </button>
        </div>
    )
}

export default WalletCredit
