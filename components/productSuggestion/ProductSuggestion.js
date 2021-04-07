import React from "react";
import Accordion from "react-bootstrap/Accordion";
import ProductItemBox from "../productItemBox/ProductItemBox";

export default function ProductSuggestion({ products }) {

  const RenderFirstRelated = ({ first, end }) => {
    var firstRelated = end ? products.slice(first, end) : products.slice(first)

    return (
      <>
        {
          firstRelated.map(product => (
            <div key={product.id} className="col-md-3">
              <ProductItemBox product={product} />
            </div>
          ))
        }
      </>
    )
  }


  return (
    <Accordion defaultActiveKey="0">
      <div className="p-sug-box-wrap">
        <div className="p-sug-box">
          <img className="p-sug-box__rect" src={`/image/Rectangle 54.png`} alt="rect" />
          <h1 className="p-sug-box__title">:محصولات مرتبط</h1>
          <div className="container-fluid p-sug-box__container">
            <div className="row p-sug-box__container__row">
              { products.length > 3 && <RenderFirstRelated first={0} end={4} /> }
            </div>
            <Accordion.Collapse eventKey="1">
              <div className="row p-sug-box__container__row">
                { products.length > 4 && <RenderFirstRelated first={5} end={null} /> }
              </div>
            </Accordion.Collapse>
          </div>
        </div>
        <div className="p-sug-show-more-wrap">
          <Accordion.Toggle as="div" variant="link" eventKey="1">
            <button className="p-sug-show-more">
              <div className="p-sug-show-more__title">نمایش بیشتر</div>
              <div className="p-sug-show-more__icon">
                <img
                  className="p-sug-show-more__icon__img"
                  src={`/image/icon/Group AD.png`}
                  alt="rect"
                />
              </div>
            </button>
          </Accordion.Toggle>
        </div>
      </div>
    </Accordion>
  );
}
