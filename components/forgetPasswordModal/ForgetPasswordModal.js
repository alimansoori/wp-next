import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {Alert, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import PropagateLoader from 'react-spinners/PropagateLoader'
import {registerUser} from '../../redux/actions/user.actions';
import {authConstants, userConstants} from "../../redux/actions/constants";
import Countdown from "react-countdown";
import {forgetPassword, loginUser} from "../../redux/actions";

export default function ForgetPasswordModal({show, onHide, redirectto, setislogin}) {

    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [confirmError, setConfirmError] = useState(false)
    const [step, setStep] = useState(1)

    const {loading, message, error, secondSendAgain} = useSelector(state => state.auth);

    const router = useRouter();
    const dispatch = useDispatch();

    const userSignup = (e) => {
        e.preventDefault();
        setStep(step + 1);

        dispatch({type: userConstants.INIT});
        dispatch(forgetPassword({
            mobile,
            password,
            code
        }));
    }

    useEffect(() => {
        if (step === 1) {
            setPassword(null);
        }
    }, [step])
    useEffect(() => {
        console.log(secondSendAgain)
    }, [secondSendAgain])

    useEffect(() => {
        if (error && step > 1) setStep(step - 1);
    }, [error])

    const handleBack = () => {
        setStep(step - 1);
        if (step === 1) {
            setCode(null);
            setPassword(null)
        }
        dispatch({type: authConstants.INIT});
    }
    const changeToLogin = () => {
        setislogin('L')
        dispatch({type: authConstants.INIT});
    }
    const handleSendAgainCode = () => {
        setPassword(null);
        setCode(null);
        dispatch({ type: authConstants.INIT })
        dispatch(forgetPassword({
            mobile,
            password: null,
            code: null
        }));
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

    // Random component
    const SendAgainEnable = () => <button onClick={handleSendAgainCode} className="forget-password-modal__send-again-code">{`ارسال مجدد`}</button>;

// Renderer callback with condition
    const SendAgainDisable = ({hours, minutes, seconds, completed}) => {
        if (completed) {
            // Render a complete state
            return <SendAgainEnable/>;
        } else {
            // Render a countdown
            return (
                <button disabled className="forget-password-modal__send-again-code">
                    {`ارسال مجدد (`}{minutes}{`:`}{seconds}{`)`}
                </button>
            );
        }
    };

    return (
        <div>
            <Modal
                className="forget-password-modal"
                onHide={onHide}
                show={show}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        className="forget-password-modal__title"
                        id="contained-modal-title-vcenter"
                    >
                        {`رمز عبور خود را فراموش کرده اید؟`}
                    </Modal.Title>
                    {step > 1 && (
                        <button onClick={handleBack} className="forget-password-modal__return">
                            <img src={`/image/icon/Return icon.svg`}/>
                        </button>
                    )}
                </Modal.Header>
                {loading ? <Loader/> : null}
                {message ? (
                    <Alert style={{textAlign: 'center', direction: 'rtl'}} variant='info'>
                        {message}
                    </Alert>
                ) : null}
                {error ? (
                    <Alert style={{textAlign: 'center', direction: 'rtl'}} variant='danger'>
                        {error}
                    </Alert>
                ) : null}
                {confirmError ? (
                    <Alert style={{textAlign: 'center', direction: 'rtl'}} variant='danger'>
                        {`تکرار رمز عبور صحیح نیست`}
                    </Alert>
                ) : null}
                <Modal.Body>
                    {step === 1 && (
                        <input
                            className="forget-password-modal__input"
                            type="text"
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="موبایل"
                        />
                    )}
                    {step === 2 && (
                        <label className="forget-password-modal__label">
                            <input
                                className="forget-password-modal__input"
                                type="text"
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="کد یک بار مصرف"
                            />
                            {secondSendAgain && (
                                <Countdown date={Date.now() + (secondSendAgain*1000)} renderer={SendAgainDisable} />
                            )}
                        </label>
                    )}
                    {step === 3 && (
                        <label className="forget-password-modal__label">
                            <input
                                className="forget-password-modal__input"
                                type="text"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="رمز عبور جدید"
                            />
                            {secondSendAgain && (
                                <Countdown date={Date.now() + (secondSendAgain*1000)} renderer={SendAgainDisable} />
                            )}
                        </label>
                    )}
                    {step < 4 && (
                        <button onClick={userSignup} className="forget-password-modal__btn" type="submit">
                            {`بازیابی رمز عبور`}
                        </button>
                    )}

                </Modal.Body>
                <Modal.Footer className="forget-password-modal__footer">
                    <span>اگر در داستانا حساب کاربری دارید:</span>
                    <button onClick={() => changeToLogin()} className="forget-password-modal__link">
                        ورود
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
