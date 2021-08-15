import {useRouter} from "next/router";
import React, {useState, useEffect, useCallback} from "react";
import Accordion from "react-bootstrap/Accordion";
import {useDispatch, useSelector} from "react-redux";
import {catFilters} from "../../redux/actions/category.actions";
import {categoryConstants} from "../../redux/actions/constants";
import CategoryFilterRender from "./CategoryFilterRender";
import Link from "next/link";

export default function HeaderSidebar(props) {
    return (
        <Accordion defaultActiveKey="0">
            <div className="p-side-box__header__icon">
                <Accordion.Toggle as="div" variant="link" eventKey="1">
                    <img
                        className="p-side-box__header__icon__img"
                        src={`/image/icon/Help icon.svg`}
                        alt="side-icon"
                    />
                </Accordion.Toggle>
            </div>
            <Accordion.Collapse eventKey="1">
                <ul className="p-side-box__header__list">
                    <li className="p-side-box__header__list__item">
                        <div className="p-side-box__header__list__item__box">
                            <div className="p-side-box__header__list__item__box__short">
                                م
                            </div>
                            <div className="p-side-box__header__list__item__box__long">
                                مشاوره
                            </div>
                        </div>
                    </li>
                    <li className="p-side-box__header__list__item">
                        <div className="p-side-box__header__list__item__box">
                            <div className="p-side-box__header__list__item__box__short">
                                خ
                            </div>
                            {/*<div className="p-side-box__header__list__item__box__long">
                                خرید
                            </div>*/}
                            <Link href={`/shop`}>
                                <a className="p-side-box__header__list__item__box__long">
                                    {`خرید`}
                                </a>
                            </Link>
                        </div>
                    </li>
                    <li className="p-side-box__header__list__item">
                        <div className="p-side-box__header__list__item__box">
                            <div className="p-side-box__header__list__item__box__short">
                                ز
                            </div>
                            <Link
                                href={`/shop/category/[category]`}
                                as= {`/shop/category/english-language`}
                            >
                                <a className="p-side-box__header__list__item__box__long">
                                    {`زبان`}
                                </a>
                            </Link>
                        </div>
                    </li>
                    <li className="p-side-box__header__list__item">
                        <div className="p-side-box__header__list__item__box">
                            <div className="p-side-box__header__list__item__box__short">
                                ک
                            </div>
                            <Link
                                href={`/shop/category/[category]`}
                                as={`/shop/category/kids-teenagers`}
                            >
                                <a className="p-side-box__header__list__item__box__long p-side-box__header__list__item__box__long--lg-text">
                                    {`کودک و نوجوان`}
                                </a>
                            </Link>
                        </div>
                    </li>
                </ul>
            </Accordion.Collapse>
        </Accordion>
    );
}
