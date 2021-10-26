import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { checkout } from "../../redux/actions/checout.actions";
import { addNewAddress, editAddress } from "../../redux/actions/customer.actions";

export default function UserAddressAddModal(props) {
  const dispatch = useDispatch()
  const { isEdit, editId } = props
  const { customer } = useSelector(state => state.customer)
  const { addresses, active } = useSelector(state => state.customer.address)
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
      isEdit
        ?
        addresses[editId]
          ?
          region.states.find(x => x.value === addresses[editId].state)
          :
          null
        :
        null
    )
  }, [editId])

  useEffect(() => {

    setSelectedCity(
      isEdit
        ?
        addresses[editId]
          ?
          selectedState
            ?
            selectedState.cities.find(x => x.value === addresses[editId].city)
            :
            (region.states.find(x => x.value === addresses[editId].state)).cities.find(x => x.value === addresses[editId].city)
          :
          null
        :
        null
    )

    setCities(
      selectedState
        ?
        selectedState.cities
        :
        (
          isEdit && addresses[editId]
            ?
            (region.states.find(x => x.value === addresses[editId].state)).cities
            :
            null
        )
    )

    if (customer) {
      setNewAddressForm({
        ...newAddressForm,
        address1: isEdit && addresses[editId] ? addresses[editId].address1 : null,
        address2: isEdit && addresses[editId] ? addresses[editId].address2 : null,
        postcode: isEdit && addresses[editId] ? addresses[editId].postcode : null,
        phone: isEdit && addresses[editId] ? addresses[editId].phone : null
      })
    }
  }, [editId, selectedState])

  const submitAddress = () => {
    if (!selectedState) { setError('فیلد استان را پر کنید'); return false }
    if (!selectedCity) { setError('فیلد شهر را پر کنید'); return false }
    if (!newAddressForm.phone) { setError('فیلد شماره موبایل را پر کنید'); return false }
    if (!newAddressForm.postcode) { setError('فیلد کد پستی را پر کنید'); return false }
    if (!newAddressForm.address1) { setError('فیلد حیابان و محله را پر کنید'); return false }
    if (!newAddressForm.address2) { setError('فیلد کوچه و پلاک را پر کنید'); return false }

    if (isEdit) {
      dispatch(
        editAddress(editId, {
          ...newAddressForm,
          state: selectedState.value,
          city: selectedCity.value
        })
      )
    } else {
      dispatch(
        addNewAddress({
          ...newAddressForm,
          state: selectedState.value,
          city: selectedCity.value
        })
      )
    }

    props.onHide()
    // dispatch(checkout({
    //   billing: {
    //     ...newAddressForm,
    //     state: selectedState.value,
    //     city: selectedCity.value
    //   }
    // }))
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
