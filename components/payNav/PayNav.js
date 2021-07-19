import React from "react";

import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import PayDetails from "../payDetails/PayDetails";

export default function PayNav(props) {
  return (
    <div className="pay-nav-wrap">
      <div className="pay-nav">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <div className="pay-nav__content">
            <div className="pay-nav__content__basket">
              <PayDetails {...props} />
            </div>
          </div>
        </Tab.Container>
      </div>
    </div>
  );
}
