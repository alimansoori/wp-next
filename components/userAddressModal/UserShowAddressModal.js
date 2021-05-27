import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

export default function UserShowAddressModal(props) {
  const { addresses, active } = useSelector(state => state.customer.address)
  const { region } = useSelector(state => state.local)

  const RenderAddress = ({ address, index }) => {
    var state = address.state ? (region.states.find(x => x.value === address.state)).label : null;
    var city = address.city && address.state ?
      (region.states.find(x => x.value === address.state)).cities.find(
        x => x.value === address.city
      ).label
      : null;

    var address1 = address.address1 ? address.address1 : '';
    var address2 = address.address2 ? address.address2 : '';

    return ('ایران' + '-' + state + '-' + city + '-' + address1 + '-' + address2)
  }

  const RenderAddressItems = () => {

    return (
      <>
        {Object.keys(addresses).map((key) => {
          return (
            <li key={key} className="user-ad-modal__list__item">
              <p style={{direction:'rtl'}} className="user-ad-modal__list__item__text">
                <RenderAddress address={addresses[key]} index={key} />
              </p>
            </li>
          )
        })}
      </>
    )
  }
  return (
    <>
      <Modal
        className="user-ad-modal"
        show={props.show}
        onHide={props.onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="user-ad-modal__header">
          <h1 className="user-ad-modal__header__title">:آدرس ها</h1>
        </div>
        <Modal.Body>
          <ul className="user-ad-modal__list">
            <RenderAddressItems />
          </ul>
          <div onClick={() => props.setIsAdd(true)} className="user-ad-modal__add">
            <img className="user-ad-modal__add__img" src={`/image/icon/Add.png`} alt="add" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
