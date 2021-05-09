import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { updateCustomer } from "../../redux/actions/customer.actions";

export default function UserAddressAddModal(props) {
  const dispatch = useDispatch()
  const { customer } = useSelector(state => state.customer)
  const { viewer } = useSelector(state => state.viewer)
  const { region } = useSelector(state => state.local)

  const [newAddressForm, setNewAddressForm] = useState({
    country: "IR",
    state: "",
    city: "",
    address1: "",
    address2: "",
    postcode: "",
    phone: ""
  })

  const [error, setError] = useState(null)
  const [selectedState, setSelectedState] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [cities, setCities] = useState(null)

  useEffect(() => {
    setSelectedState(
      customer
        ?
        region.states.find(x => x.value === customer.billing.state)
        :
        null
    )

    setSelectedCity(
      customer
        ?
        selectedState
          ?
          selectedState.cities.find(x => x.value === customer.billing.city)
          :
          (region.states.find(x => x.value === customer.billing.state)).cities.find(x => x.value === customer.billing.city)
        :
        null
    )

    setCities(
      selectedState
        ?
        selectedState.cities
        :
        (
          customer
            ?
            (region.states.find(x => x.value === customer.billing.state)).cities
            :
            null
        )
    )

    if (customer) {
      setNewAddressForm({
        ...newAddressForm,
        address1: customer.billing.address1,
        address2: customer.billing.address2,
        postcode: customer.billing.postcode,
        phone: customer.billing.phone
      })
    }
  }, [])

  const submitAddress = () => {
    if (!selectedState) { setError('فیلد استان را پر کنید'); return false }
    if (!selectedCity) { setError('فیلد شهر را پر کنید'); return false }

    dispatch(updateCustomer({
      id: viewer.id,
      billing: {
        ...newAddressForm,
        state: selectedState.value,
        city: selectedCity.value
      }
    }))
  }

  const handleChangeState = selectedOption => {
    setSelectedState(selectedOption)

    setCities(region.states.find(x => x.value === selectedOption.value).cities)
    setSelectedCity(null)
  };

  const handleChangeCity = selectedOption => {
    setSelectedCity(selectedOption)
  };

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
          {`افزودن آدرس`}
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
        <Select
          className="address-modal__select"
          value={selectedState}
          isSearchable={true}
          onChange={handleChangeState}
          options={region.states}
          placeholder={`استان ...`}
        />
        {
          (cities || selectedCity) ? (
            <Select
              className="address-modal__select"
              value={selectedCity}
              isSearchable={true}
              onChange={handleChangeCity}
              options={cities}
              placeholder={`شهر ...`}
            />
          ) : null
        }
        <input
          className="sign-in-modal__input"
          type="text"
          value={newAddressForm.address1 ? newAddressForm.address1 : ''}
          onChange={(e) => setNewAddressForm({ ...newAddressForm, "address1": e.target.value })}
          placeholder="خیابان و محله ..."
        />
        <input
          className="sign-in-modal__input"
          type="text"
          value={newAddressForm.address2 ? newAddressForm.address2 : ''}
          onChange={(e) => setNewAddressForm({ ...newAddressForm, "address2": e.target.value })}
          placeholder="کوچه و پلاک ..."
        />
        <input
          className="sign-in-modal__input"
          type="text"
          value={newAddressForm.postcode ? newAddressForm.postcode : ''}
          onChange={(e) => setNewAddressForm({ ...newAddressForm, "postcode": e.target.value })}
          placeholder="کدپستی"
        />
        <input
          className="sign-in-modal__input"
          type="text"
          value={newAddressForm.phone ? newAddressForm.phone : ''}
          onChange={(e) => setNewAddressForm({ ...newAddressForm, "phone": e.target.value })}
          placeholder="تلفن"
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
