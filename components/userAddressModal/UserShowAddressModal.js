import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

export default function UserShowAddressModal(props) {
  const { customer } = useSelector(state => state.customer)

  const getAddresses = () => {
    let addresses = []

    // if (customer.metaData) {
    //   addresses = customer.metaData.find(m => m.key.startWith('address-'))
    // }
    return addresses
  }

  const RenderAddressItems = () => {
    let addresses = getAddresses()

    return (
      <>
        {addresses.map((address) => {
          var addValue = JSON.parse(address.value)
          return (
            <li className="user-ad-modal__list__item">
              <p className="user-ad-modal__list__item__text">
                {`${addValue.country}-${addValue.state}-${addValue.city}`}
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
