import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../../redux/actions/customer.actions";

export default function UserAddressAddModal(props) {
  const dispatch = useDispatch()
  const {customer} = useSelector(state => state.customer)

  const [newAddressForm, setNewAddressForm] = useState({
    "country": "IR",
    "state": "",
    "city": "",
    "street": "",
    "alley": "",
    "number": "",
    "desc": "",
    "postcode": "",
    "phone": "",
    "mobile": ""
  })

  const [error, setError] = useState(null)

  const submitAddress = () => {
    if (!newAddressForm.state) {setError('فیلد استان را پر کنید'); return false}
    if (!newAddressForm.city) {setError('فیلد شهر را پر کنید'); return false}
    
    let numberAddress = 1
    if (customer.metaData) {
      numberAddress = parseInt(customer.metaData.find(m => m.key === 'number-address')) + 1
    }

    dispatch(updateCustomer({
      metaData: [
        {
          "key": `address-${numberAddress}`,
          "value": JSON.stringify(newAddressForm)
        },
        {
          "key": "number-address",
          "value": `${numberAddress}`
        }
      ]
    }))

    props.setIsAdd(false)
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
          {`افزودن آدرس جدید`}
        </Modal.Title>
      </Modal.Header>
      {/* {loading ? <Loader /> : null} */}
      {/* {message ? (
        <Alert style={{ textAlign: 'center', direction: 'rtl' }} variant='info'>
          {message}
        </Alert>
      ) : null} */}
      {error ? (
        <Alert style={{ textAlign: 'center', direction: 'rtl' }} variant='danger'>
          {error}
        </Alert>
      ) : null}
      <Modal.Body>
        <input
          className="sign-in-modal__input"
          type="text"
          onChange={(e) => setNewAddressForm({...newAddressForm, "state": e.target.value})}
          placeholder="استان"
        />
        <input
          className="sign-in-modal__input"
          type="text"
          onChange={(e) => setNewAddressForm({...newAddressForm, "city": e.target.value})}
          placeholder="شهر"
        />
        <input
          className="sign-in-modal__input"
          type="text"
          onChange={(e) => setNewAddressForm({...newAddressForm, "street": e.target.value})}
          placeholder="خیابان"
        />
        <input
          className="sign-in-modal__input"
          type="text"
          onChange={(e) => setNewAddressForm({...newAddressForm, "alley": e.target.value})}
          placeholder="کوچه"
        />
        <input
          className="sign-in-modal__input"
          type="text"
          onChange={(e) => setNewAddressForm({...newAddressForm, "number": e.target.value})}
          placeholder="پلاک"
        />
        <input
          className="sign-in-modal__input"
          type="text"
          onChange={(e) => setNewAddressForm({...newAddressForm, "desc": e.target.value})}
          placeholder="خیابان-کوچه-پلاک"
        />
        <input
          className="sign-in-modal__input"
          type="text"
          onChange={(e) => setNewAddressForm({...newAddressForm, "postcode": e.target.value})}
          placeholder="کدپستی"
        />
        <input
          className="sign-in-modal__input"
          type="text"
          onChange={(e) => setNewAddressForm({...newAddressForm, "phone": e.target.value})}
          placeholder="تلفن"
        />
        <input
          className="sign-in-modal__input"
          type="text"
          onChange={(e) => setNewAddressForm({...newAddressForm, "mobile": e.target.value})}
          placeholder="موبایل"
        />
        <button
          className="sign-in-modal__btn"
          type="submit"
          onClick={submitAddress}
        >
          {`ثبت`}
          </button>
      </Modal.Body>
    </Modal>
  );
}
