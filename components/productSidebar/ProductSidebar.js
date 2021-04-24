import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { catFilters } from "../../redux/actions/category.actions";
import { categoryConstants } from "../../redux/actions/constants";
import CategoryFilterRender from "./CategoryFilterRender";

export default function ProductSidebar({ slugs }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);

  useEffect(() => {
    // console.log(categories)
    dispatch(catFilters(slugs, categories));
  }, [slugs, categories]);

  return (
    <div className="p-side-box-wrap">
      <div className="p-hero-box-wrap-fade"></div>
      <div className="p-side-box p-side-box--desktop">
        <div className="p-side-box__header">
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
                    <div className="p-side-box__header__list__item__box__long">
                      خرید
                    </div>
                  </div>
                </li>
                <li className="p-side-box__header__list__item">
                  <div className="p-side-box__header__list__item__box">
                    <div className="p-side-box__header__list__item__box__short">
                      ز
                    </div>
                    <div className="p-side-box__header__list__item__box__long">
                      زبان
                    </div>
                  </div>
                </li>
                <li className="p-side-box__header__list__item">
                  <div className="p-side-box__header__list__item__box">
                    <div className="p-side-box__header__list__item__box__short">
                      ک
                    </div>
                    <div className="p-side-box__header__list__item__box__long p-side-box__header__list__item__box__long--lg-text">
                      کودک و نوجوان
                    </div>
                  </div>
                </li>
              </ul>
            </Accordion.Collapse>
          </Accordion>
        </div>
        <div className="p-side-box__list-wrap">
          <img
            className="p-side-box__list__icon"
            src={`/image/Rectangle 78.png`}
            alt="side-icon"
          />
          <CategoryFilterRender />
        </div>
      </div>
    </div>
  );
}
