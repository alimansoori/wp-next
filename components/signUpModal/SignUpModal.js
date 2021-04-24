import { useRouter } from "next/router";
import React, { useState } from "react";
import { Alert, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropagateLoader from 'react-spinners/PropagateLoader'
import { registerUser } from '../../redux/actions/user.actions';

export default function SignUpModal(props) {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmError, setConfirmError] = useState(false)

  const { error, message, loading } = useSelector(state => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  const registerQryInput = {
    username,
    email,
    password
  };

  const userSignup = (e) => {
    e.preventDefault();
    setConfirmError(false)

    if (confirmPassword === password) {
      dispatch(registerUser(
        registerQryInput
      ));
    } else {
      setConfirmError(true)
    }
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
            {`ثبت نام`}
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
        {confirmError ? (
          <Alert style={{ textAlign: 'center', direction: 'rtl' }} variant='danger'>
            {`تکرار رمز عبور صحیح نیست`}
          </Alert>
        ) : null}
        <Modal.Body>
          <input
            className="sign-up-modal__input"
            type="text"
            placeholder="نام کاربری"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="sign-up-modal__input"
            type="email"
            placeholder="ایمیل"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="sign-up-modal__input"
            type="password"
            placeholder="رمز عبور"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="sign-up-modal__input"
            type="password"
            placeholder="تکرار رمز عبور"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={userSignup} className="sign-up-modal__btn" type="submit">
            ثبت نام
          </button>
        </Modal.Body>
        <Modal.Footer className="sign-up-modal__footer">
          <button onClick={props.whoModal} className="sign-up-modal__link">
            قبلا ثبت نام کرده اید؟ / ورود
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
