import React from "react";
import Modal from "react-bootstrap/Modal";

export default function UserAddressModal(props) {
  return (
    <div>
      <Modal
        className="user-ad-modal"
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="user-ad-modal__header">
          <h1 className="user-ad-modal__header__title">:آدرس ها</h1>
        </div>
        <Modal.Body>
          <ul className="user-ad-modal__list">
            <li className="user-ad-modal__list__item">
              <p className="user-ad-modal__list__item__text">
                ایران- تهران- خیابان- کوچه-پلاک
              </p>
            </li>
            <li className="user-ad-modal__list__item">
              <p className="user-ad-modal__list__item__text">
                ایران- تهران- خیابان- کوچه-پلاک
              </p>
            </li>
            <li className="user-ad-modal__list__item">
              <p className="user-ad-modal__list__item__text">
                ایران- تهران- خیابان- کوچه-پلاک
              </p>
            </li>
          </ul>
          <div className="user-ad-modal__add">
            <img className="user-ad-modal__add__img" src={`/image/icon/Add.png`} alt="add" />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
