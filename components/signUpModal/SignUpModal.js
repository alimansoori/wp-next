import React from "react";
import { Modal } from "react-bootstrap";

export default function SignUpModal(props) {
  return (
    <div>
      <Modal
        className="sign-up-modal"
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            className="sign-up-modal__title"
            id="contained-modal-title-vcenter"
          >
            ثبت نام
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="sign-up-modal__input"
            type="text"
            placeholder="نام و نام خانوادگی"
          />
          <input
            className="sign-up-modal__input"
            type="text"
            placeholder="شماره موبایل"
          />
          <button className="sign-up-modal__btn" type="submit">
            ثبت نام
          </button>
        </Modal.Body>
        <Modal.Footer className="sign-up-modal__footer">
          <a href="/" className="sign-up-modal__link">
            قبلا ثبت نام کرده اید؟ / ورود
          </a>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
