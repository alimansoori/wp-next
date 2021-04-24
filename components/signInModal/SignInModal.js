import { useRouter } from "next/router";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../../redux/actions/auth.actions'
import PropagateLoader from 'react-spinners/PropagateLoader'

export default function SignInModal(props) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { authenticate, loading, message, error } = useSelector(state => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        username,
        password
      }))
  }

  const Loader = () => {
    return (
      <div className="d-flex justify-content-center bd-highlight mb-3">
        <PropagateLoader
          loading={true}
          color="rgb(0, 114, 187)"
        />
      </div>
    )
  }

  return (
    <div>
      <Modal
        className="sign-in-modal"
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            className="sign-in-modal__title"
            id="contained-modal-title-vcenter"
          >
            {`ورود کاربر`}
          </Modal.Title>
        </Modal.Header>
        {loading ? <Loader /> : null}
        {message ? (
          <Alert style={{ textAlign: 'center', direction: 'rtl' }} variant='info'>
            {message}
          </Alert>
        ) : null}
        {error ? (
          <Alert style={{ textAlign: 'center', direction: 'rtl' }} variant='danger'>
            {error}
          </Alert>
        ) : null}
        <Modal.Body>
          <input
            className="sign-in-modal__input"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="نام کاربری"
          />
          <input
            className="sign-in-modal__input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور"
          />
          <button
            className="sign-in-modal__btn"
            type="submit"
            onClick={userLogin}
          >
            ورود
          </button>
        </Modal.Body>
        <Modal.Footer className="sign-in-modal__footer">
          <button onClick={props.whoModal} className="sign-in-modal__link">
            ثبت نام نکرده اید؟ / ثبت نام
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
