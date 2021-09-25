import {useRouter} from "next/router";
import React, {useEffect, useRef, useState} from "react";
import {Alert} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from '../../redux/actions';
import PropagateLoader from 'react-spinners/PropagateLoader'
import {authConstants} from "../../redux/actions/constants";
import Countdown from "react-countdown";
import {registerUser} from "../../redux/actions/user.actions";

export default function SignInModal({show, onHide, redirectto, setislogin}) {
    const router = useRouter()
    const dispatch = useDispatch()
    const {authenticate, loading, message, error, secondSendAgain} = useSelector(state => state.auth);
    const [username, setUsername] = useState('');
    const [passType, setPassType] = useState('PASSWORD');
    const [step, setStep] = useState(1);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        if (authenticate && redirectto) {
            onHide()
            router.push(redirectto)
        }
    }, [authenticate])

    const userLogin = (e) => {
        e.preventDefault();

        setStep(step + 1);
        userLogin2();
    }

    const userLogin2 = () => {
        dispatch({type: authConstants.INIT})
        dispatch(
            loginUser({
                username,
                password,
                passType
            }))
    }

    useEffect(() => {
        // userLogin2()
    }, [passType])

    useEffect(() => {
        if (error && step > 1) setStep(step - 1);
    }, [error])

    useEffect(() => {
        if (step === 1) {
            setPassword(null);
            setPassType('PASSWORD');
        }
    }, [step])

    const handleClickOnTimeCode = () => {
        setPassType(state => 'CODE');
        setPassword(state => null);
        dispatch(
            loginUser({
                username,
                password: null,
                passType: 'CODE'
            }))
    }
    const handleLoginByPassword = () => {
        setPassType('PASSWORD');
        dispatch({type: authConstants.INIT});
    }
    const handleBack = () => {
        setStep(step - 1);
        dispatch({type: authConstants.INIT});
    }
    const changeToSignUp = () => {
        setislogin('R')
        dispatch({type: authConstants.INIT});
    }
    const changeToForgetPass = () => {
        setislogin('F')
        dispatch({type: authConstants.INIT});
    }
    const handleSendAgainCode = () => {
        setPassword(null);
        dispatch({ type: authConstants.INIT })
        dispatch(loginUser({
            username,
            password: null,
            passType
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
    const SendAgainEnable = () => <button onClick={handleSendAgainCode} className="sign-in-modal__send-again-code">{`ارسال مجدد`}</button>;

// Renderer callback with condition
    const SendAgainDisable = ({hours, minutes, seconds, completed}) => {
        if (completed) {
            // Render a complete state
            return <SendAgainEnable/>;
        } else {
            // Render a countdown
            return (
                <button disabled className="sign-in-modal__send-again-code">
                    {`ارسال مجدد (`}{seconds}{`)`}
                </button>
            );
        }
    };

    return (
        <div>
            <Modal
                className="sign-in-modal"
                onHide={onHide}
                show={show}
                onShow={() => dispatch({type: authConstants.INIT})}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title
                        className="sign-in-modal__title"
                        id="contained-modal-title-vcenter"
                    >
                        {`ورود کاربر`}
                    </Modal.Title>
                    {step > 1 && (
                        <button onClick={handleBack} className="sign-in-modal__return">
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
                <Modal.Body>
                    {step === 1 && (
                        <input
                            className="sign-in-modal__input"
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="ایمیل یا موبایل یا نام کاربری"
                        />
                    )}
                    {passType === 'PASSWORD' && step > 1 && (
                        <input
                            className="sign-in-modal__input"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="رمز عبور"
                        />
                    )}
                    {passType === 'CODE' && step > 1 && (
                        <label className="sign-in-modal__label">
                            <input
                                className="sign-in-modal__input"
                                type="text"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="کد یک بار مصرف"
                            />
                            {secondSendAgain && (
                                <Countdown date={Date.now() + (secondSendAgain * 1000)} renderer={SendAgainDisable}/>
                            )}
                        </label>
                    )}
                    <button
                        className="sign-in-modal__btn"
                        type="submit"
                        onClick={userLogin}
                    >
                        ورود
                    </button>
                </Modal.Body>
                {step > 1 && passType === 'PASSWORD' && username.match(/^[09]{2}[0-9]{9}$/) && (
                    <Modal.Footer className="sign-in-modal__footer">
                        <button onClick={handleClickOnTimeCode} className="sign-in-modal__link">
                            ارسال کد یک بار مصرف از طریق پیامک
                        </button>
                    </Modal.Footer>
                )}
                {step > 1 && passType === 'CODE' && (
                    <Modal.Footer className="sign-in-modal__footer">
                        <button onClick={handleLoginByPassword} className="sign-in-modal__link">
                            ورود با رمز عبور
                        </button>
                    </Modal.Footer>
                )}
                <Modal.Footer className="sign-in-modal__footer">
                    <span>اگر اطلاعات حساب خود را فراموش کرده اید:</span>
                    <button onClick={changeToForgetPass} className="sign-in-modal__link">
                        بازیابی
                    </button>
                </Modal.Footer>
                <Modal.Footer className="sign-in-modal__footer">
                    <span>اگر در داستانا حساب کاربری ندارید، ثبت نام کنید:</span>
                    <button onClick={changeToSignUp} className="sign-in-modal__link">
                        ثبت نام
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
