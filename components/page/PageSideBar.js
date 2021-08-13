import HeaderSidebar from "../productSidebar/HeaderSidebar";
import Link from 'next/link'
import {useCallback, useState} from "react";

export default function PageSideBar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = useCallback(() => setShowSidebar((value) => !value));

    const RenderLinksList = () => (
        <div className="p-side-box__list-wrap">
            <img
                className="p-side-box__list__icon"
                src={`/image/Rectangle 78.png`}
                alt="side-icon"
            />
            <h2 className="p-side-box__list__title">
                <span className="p-side-box__list__title__link">
                    {`اطلاعات سایت`}
                </span>
            </h2>
            <ul className="p-side-box__list">
                <li className="p-side-box__list__item">
                    <Link as={`/about-us`} href={`/[page]`}>
                        <a className="p-side-box__list__item__link">
                            {`درباره ما`}
                        </a>
                    </Link>
                </li>
                <li className="p-side-box__list__item">
                    <Link as={`/contact-us`} href={`/[page]`}>
                        <a className="p-side-box__list__item__link">
                            {`تماس با ما`}
                        </a>
                    </Link>
                </li>
                <li className="p-side-box__list__item">
                    <Link as={`/privacy-policy`} href={`/[page]`}>
                        <a className="p-side-box__list__item__link">
                            {`حریم خصوصی`}
                        </a>
                    </Link>
                </li>
                <li className="p-side-box__list__item">
                    <Link as={`/buy-shipping`} href={`/[page]`}>
                        <a className="p-side-box__list__item__link">
                            {`راهنمای خرید و ارسال`}
                        </a>
                    </Link>
                </li>
                <li className="p-side-box__list__item">
                    <Link as={`/faq`} href={`/[page]`}>
                        <a className="p-side-box__list__item__link">
                            {`سوالات متداول`}
                        </a>
                    </Link>
                </li>
                <li className="p-side-box__list__item">
                    <Link as={`/terms-conditions`} href={`/[page]`}>
                        <a className="p-side-box__list__item__link">
                            {`قوانین و مقررات`}
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
    return (
        <div className="p-side-box-wrap">
            <div className="p-hero-box-wrap-fade"></div>
            <div className="p-side-box p-side-box--desktop">
                <div className="p-side-box__header">
                    <HeaderSidebar/>
                </div>
                <RenderLinksList/>
            </div>
            <div className="p-side-box p-side-box--res">
                <div
                    className={
                        showSidebar ? "p-side-box" : "p-side-box p-side-box--close"
                    }
                >
                    <button
                        className="p-side-box--res__toggle"
                        onClick={toggleSidebar}
                        showSideBar={showSidebar}
                    >
                        <img
                            className={
                                showSidebar
                                    ? "p-side-box--res__toggle--close"
                                    : "p-side-box--res__toggle--open"
                            }
                            src={`/image/icon/arrow.png`}
                            alt="arrow"
                        />
                    </button>
                    <div className="p-side-box__header">
                        <HeaderSidebar/>
                    </div>
                    <RenderLinksList/>
                </div>
            </div>
        </div>
    )
}