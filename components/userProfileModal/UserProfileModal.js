import React, {useEffect, useState} from "react";
import {Alert} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {useDispatch, useSelector} from "react-redux";
import Select from 'react-select'
import {checkout} from "../../redux/actions/checout.actions";
import {updateUser} from "../../redux/actions/user.actions";

export default function UserProfileModal(props) {
    const dispatch = useDispatch()
    const {viewer} = useSelector(state => state.viewer)
    const {loading, message} = useSelector(state => state.user)

    const [form, setForm] = useState({
        firstName: null,
        lastName: null,
        email: null
    })

    useEffect(() => {
        if (viewer) {
            setForm({
                firstName: viewer.firstName,
                lastName: viewer.lastName,
                email: viewer.email
            })
        }
    }, [viewer])

    const handleChangeInput = (e) => {
        e.preventDefault()
        setForm({...form, "firstName": e.target.value})
    }
    const handleClose = () => {
        props.onHide()
    }

    const submitForm = () => {
        dispatch(updateUser({...form}))
    }

    return (
        <Modal
            className="sign-in-modal"
            show={props.show}
            onHide={props.onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title
                    className="sign-in-modal__title"
                    id="contained-modal-title-vcenter"
                >
                    {`ویرایش کاربر`}
                </Modal.Title>
            </Modal.Header>
            {message ? (
                <Alert style={{textAlign: 'center', direction: 'rtl'}} variant='success'>
                    {message}
                </Alert>
            ) : null}
            <Modal.Body>
                <input
                    className="sign-in-modal__input"
                    type="text"
                    value={form.firstName ? form.firstName : ''}
                    onChange={(e) => handleChangeInput(e)}
                    placeholder="نام"
                />
                <input
                    className="sign-in-modal__input"
                    type="text"
                    value={form.lastName ? form.lastName : ''}
                    onChange={(e) => setForm({...form, "lastName": e.target.value})}
                    placeholder="نام خانوادگی"
                />
                <input
                    className="sign-in-modal__input"
                    type="text"
                    value={form.email ? form.email : ''}
                    onChange={(e) => setForm({...form, "email": e.target.value})}
                    placeholder="پست الکترونیک"
                />
            </Modal.Body>
            <Modal.Footer>

                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={submitForm}
                >
                    {loading ? (
                        <img
                            style={{width: '40px'}}
                            className="p-hero-box__l-col__purchase__buy__icon"
                            src={`/image/icon/white-spinner.svg`}
                            alt="icon"
                        />
                    ) : 'ثبت'}
                </button>
                <button onClick={handleClose} type="button" className="btn btn-secondary" data-dismiss="modal">{'بستن'}</button>
            </Modal.Footer>
        </Modal>
    )
}
