import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {Alert, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import PropagateLoader from 'react-spinners/PropagateLoader'
import {registerUser} from '../../redux/actions/user.actions';
import {authConstants, userConstants} from "../../redux/actions/constants";
import Countdown from "react-countdown";

export default function SignUpModal({show, onHide, redirectto, setislogin}) {

    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [confirmError, setConfirmError] = useState(false)
    const [step, setStep] = useState(1)

    const {authenticate, loading, message, error, secondSendAgain} = useSelector(state => state.auth);

    const router = useRouter();
    const dispatch = useDispatch();

    const userSignup = (e) => {
        e.preventDefault();
        setStep(step + 1);

        dispatch({type: userConstants.INIT});
        dispatch(registerUser({
            mobile,
            password
        }));
    }

    useEffect(() => {
        if (authenticate && redirectto) {
            onHide()
            router.push(redirectto)
        }
    }, [authenticate])

    useEffect(() => {
        if (step === 1) {
            setPassword(null);
        }
    }, [step])

    useEffect(() => {
        if (error && step > 1) setStep(step - 1);
    }, [error])

    const handleBack = () => {
        setStep(step - 1);
        dispatch({type: authConstants.INIT});
    }
    const changeToLogin = () => {
        setislogin('L')
        dispatch({type: authConstants.INIT});
    }
    const handleSendAgainCode = () => {
        setPassword(null);
        dispatch({ type: authConstants.INIT })
        dispatch(registerUser({
            mobile,
            password: null
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
    const SendAgainEnable = () => <button onClick={handleSendAgainCode} className="sign-up-modal__send-again-code">{`ارسال مجدد`}</button>;

// Renderer callback with condition
    const SendAgainDisable = ({hours, minutes, seconds, completed}) => {
        if (completed) {
            // Render a complete state
            return <SendAgainEnable/>;
        } else {
            // Render a countdown
            return (
                <button disabled className="sign-up-modal__send-again-code">
                    {`ارسال مجدد (`}{seconds}{`)`}
                </button>
            );
        }
    };

    return (
        <div>
            <Modal
                className="sign-up-modal"
                onHide={onHide}
                show={show}
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
                    {step > 1 && (
                        <button onClick={handleBack} className="sign-up-modal__return">
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
                            className="sign-up-modal__input"
                            type="text"
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="موبایل"
                        />
                    )}
                    {step > 1 && (
                        <label className="sign-up-modal__label">
                            <input
                                className="sign-up-modal__input"
                                type="text"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="کد یک بار مصرف"
                            />
                            {secondSendAgain && (
                                <Countdown date={Date.now() + (secondSendAgain*1000)} renderer={SendAgainDisable} />
                            )}
                        </label>
                    )}
                    <button onClick={userSignup} className="sign-up-modal__btn" type="submit">
                        ثبت نام
                    </button>
                </Modal.Body>
                <Modal.Footer className="sign-up-modal__footer">
                    <span>اگر در داستانا حساب کاربری دارید:</span>
                    <button onClick={() => changeToLogin()} className="sign-up-modal__link">
                        ورود
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
