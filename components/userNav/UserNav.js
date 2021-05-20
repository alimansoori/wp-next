import React from "react";
import UserBasket from "../userBasket/UserBasket";
import UserHistory from "../userHistory/UserHistory";
import UserWallet from "../userWallet/UserWallet";
import UserFavourites from "../userFavourites/UserFavourites";
import UserCart from "../userCart/UserCart";
import UserIfo from "../userInfo/UserIfo";

import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

export default function UserNav(props) {
  return (
    <div className="user-nav-wrap">
      <div className="user-nav">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <div className="user-nav__tab-bar">
            <div className="user-nav__tab-bar-wrap">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="first">
                    <div className="user-nav__tab-bar__item">
                      <img
                        className="user-nav__tab-bar__item__icon"
                        src={`/image/icon/Latest shop.svg`}
                        alt="shop"
                      />
                      <h1 className="user-nav__tab-bar__item__title">
                        تاریخچه خرید
                      </h1>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="2">
                    <div className="user-nav__tab-bar__item">
                      <img
                        className="user-nav__tab-bar__item__icon"
                        src={`/image/icon/wallet-filled-money-tool.svg`}
                        alt="wallet"
                      />
                      <h1 className="user-nav__tab-bar__item__title">
                        کیف پول
                      </h1>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="3">
                    <div className="user-nav__tab-bar__item">
                      <img
                        className="user-nav__tab-bar__item__icon"
                        src={`/image/icon/Favorite.svg`}
                        alt="fav"
                      />
                      <h1 className="user-nav__tab-bar__item__title">
                        علاقه مندی ها
                      </h1>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="4">
                    <div className="user-nav__tab-bar__item">
                      <img
                        className="user-nav__tab-bar__item__icon"
                        src={`/image/icon/Shop.svg`}
                        alt="basket"
                      />
                      <h1 className="user-nav__tab-bar__item__title">
                        سبد خرید
                      </h1>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="5">
                    <div className="user-nav__tab-bar__item">
                      <img
                        className="user-nav__tab-bar__item__icon"
                        src={`/image/icon/user icon.svg`}
                        alt="info"
                      />
                      <h1 className="user-nav__tab-bar__item__title">مشخصات</h1>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
          <div className="user-nav__content">
            <div className="user-nav__content__basket">
              <UserBasket {...props} />
            </div>
            <div className="user-nav__content__tabs">
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div className="user-nav__content__tabs-wrap">
                    <UserHistory />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                  <div className="user-nav__content__tabs-wrap">
                    <UserWallet />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="3">
                  <div className="user-nav__content__tabs-wrap">
                    <UserFavourites />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="4">
                  <div className="user-nav__content__tabs-wrap">
                    <UserCart />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="5">
                  <div className="user-nav__content__tabs-wrap">
                    <UserIfo />
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      </div>
    </div>
  );
}
