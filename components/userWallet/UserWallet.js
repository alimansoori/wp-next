import React from "react";
import { RadioGroup, RadioButton } from "react-radio-buttons";

export default function UserWallet() {
  return (
    <div className="user-wallet-box">
      <div className="user-wallet-box__header">
        <h1 className="user-wallet-box__header__title">:کیف پول</h1>
        <div className="fade-border-bot"></div>
      </div>
      <div className="user-wallet-box__body">
        <div className="user-wallet-box__body__logo">
          <img
            className="user-wallet-box__body__logo__img"
            src={`/image/icon/wallet-filled-money-tool-g.svg`}
            alt="wallet"
          />
        </div>
        <div className="user-wallet-box__body__desc">
          <p className="user-wallet-box__body__desc__text">متن توضیحات</p>
        </div>
        <div className="user-wallet-box__body__amount">
          <div className="user-wallet-box__body__amount__input-wrap">
            <button className="user-wallet-box__body__amount__plus">
              <img
                className="user-wallet-box__body__amount__plus__icon"
                src={`/image/icon/PLUS.png`}
                alt="plus"
              />
            </button>
            <input
              className="user-wallet-box__body__amount__input"
              type="text"
              placeholder="500/0000"
            />
            <button className="user-wallet-box__body__amount__minus">
              <img
                className="user-wallet-box__body__amount__minus__icon"
                src={`/image/icon/Rectangle 132.png`}
                alt="minus"
              />
            </button>
          </div>
        </div>
        <div className="user-wallet-box__body__credit">
          <div className="user-wallet-box__body__credit-wrap">
            <RadioGroup horizontal>
              <RadioButton pointColor="#26c7bf" rootColor="#000" value="h1">
                تایم
              </RadioButton>
              <RadioButton pointColor="#26c7bf" rootColor="#000" value="h2">
                تایم
              </RadioButton>
              <RadioButton pointColor="#26c7bf" rootColor="#000" value="h3">
                تایم
              </RadioButton>
              <RadioButton pointColor="#26c7bf" rootColor="#000" value="h4">
                تایم
              </RadioButton>
            </RadioGroup>
          </div>
        </div>
      </div>
      <div className="user-wallet-box__footer">
        <button className="user-wallet-box__footer__cancel">انصراف</button>
        <button className="user-wallet-box__footer__submit">
          افزایش موجودی
        </button>
      </div>
    </div>
  );
}
