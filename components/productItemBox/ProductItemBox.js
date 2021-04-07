import Link from "next/link";
import React from "react";
import { stringToNumber } from "../../functions";

export default function ProductItemBox({ product }) {

  const RenderProductAttrs = ({ attrs }) => {
    const joinString = attrs.map(e => {
      var name = e.name
      var split = name.split("|")

      var nameRes = split.length ? split[0] : e.name

      return nameRes
    }).join(',')

    return joinString
  }

  const RenderImageItem = () => {
    const imageSrc = product.image ? product.image.sourceUrl : '/image/book picture.png';
    const imageAlt = product.image ? product.image.altText : 'Dastanaa';

    return (
      <img
        className="p-sug-box__container__item__book__pic"
        src={imageSrc}
        alt={imageAlt}
      />
    )
  }

  return (
    <Link as={`/product/${product.slug}`}
      href={`/product/[slug]`} >
      <a className="p-sug-box__container__item">
        <div className="p-sug-box__container__item__book">
          <RenderImageItem />
          <div className="p-sug-box__container__item__header__icon-wrap">
            <div className="p-sug-box__container__item__header__icon">
              <img
                className="p-sug-box__container__item__header__icon__img"
                src={`/image/icon/save.svg`}
                alt="save"
              />
            </div>
            <div className="p-sug-box__container__item__header__icon">
              <img
                className="p-sug-box__container__item__header__icon__img"
                src={`/image/icon/Basket.svg`}
                alt="basket"
              />
            </div>
          </div>
        </div>
        <div className="p-sug-box__container__item__header">
          <strong className="p-sug-box__container__item__header__title">
            {product.name}
          </strong>
        </div>
        <div className="p-sug-box__container__item__details">
          <div className="p-sug-box__container__item__details__author">
            <RenderProductAttrs attrs={product.paWriters.nodes} />
          </div>
          <div className="p-sug-box__container__item__details__publisher">
            <RenderProductAttrs attrs={product.paPublishers.nodes} />
          </div>
          <strong className="p-sug-box__container__item__details__price">
            {stringToNumber(product.price) + 'ت'}
          </strong>
        </div>
      </a>
    </Link>
  );
}