import Tab from "react-bootstrap/Tab";
import React from "react";
import {Alert} from "react-bootstrap";

export default function AccessDenied(props) {
    return (
        <div className="pay-nav-wrap">
            <div className="pay-nav">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <div className="pay-nav__content">
                        <div className="pay-nav__content__basket">
                            <div className="pay-details-box">
                                <Alert style={{ direction: 'rtl' }} variant={`danger`}>
                                    {`برای دسترسی به این بخش لطفا وارد سایت شوید و یا در سایت ثبت‌نام کنید.`}
                                </Alert>

                            </div>
                        </div>
                    </div>
                </Tab.Container>
            </div>
        </div>
    )
}