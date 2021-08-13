import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { catFilters } from "../../redux/actions/category.actions";
import { categoryConstants } from "../../redux/actions/constants";
import CategoryFilterRender from "./CategoryFilterRender";
import HeaderSidebar from "./HeaderSidebar";

export default function ProductSidebar({ cat, cats, loading }) {
  const dispatch = useDispatch();
  // const { categories } = useSelector(state => state.category);

  /*useEffect(() => {
    // let cats = [...categories]
    dispatch(catFilters(slugs, cats));
  }, [slugs, cats]);*/

  return (
    <div className="p-side-box-wrap">
      <div className="p-hero-box-wrap-fade"></div>
      <div className="p-side-box p-side-box--desktop">
        <div className="p-side-box__header">
          <HeaderSidebar/>
        </div>
        <div className="p-side-box__list-wrap">
          <img
            className="p-side-box__list__icon"
            src={`/image/Rectangle 78.png`}
            alt="side-icon"
          />
          <CategoryFilterRender cats={cats} cat={cat} />
        </div>
      </div>
    </div>
  );
}
