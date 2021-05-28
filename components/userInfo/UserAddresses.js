import React from "react"
import { RadioGroup, RadioButton } from "react-radio-buttons"
import { useDispatch, useSelector } from "react-redux";
import { removeAddress, setActiveAddress } from "../../redux/actions/customer.actions";
import UserAddressAddModal from "../userAddressModal/UserAddressAddModal";

export default function UserAddresses() {
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = React.useState(false)
    const [isEdit, setIsEdit] = React.useState(false)
    const [editId, setEditId] = React.useState(null)
    const { addresses, active, loading } = useSelector(state => state.customer.address)
    const { region } = useSelector(state => state.local)

    const handleAddModal = () => {
        setIsEdit(false)
        setEditId(null)
        setModalShow(true)
    }
    
    const handleEditModal = (e, editIdd) => {
        e.preventDefault()
        setIsEdit(true)
        setEditId(editIdd)
        setModalShow(true)
    }

    const handleRemoveModal = (e, removeId) => {
        e.preventDefault()
        dispatch(
            removeAddress(removeId)
        )
    }

    const RenderAddresses = () => {
        if (!loading && addresses && active) {
            return (
                <RadioGroup value={active} onChange={(value) => dispatch(setActiveAddress(value))}>
                    {
                        Object.keys(addresses).map((key) => (
                            <RadioButton key={key} pointColor="#26c7bf" rootColor="#000" value={key}>
                                <RenderAddress address={addresses[key]} index={key} />
                            </RadioButton>
                        ))
                    }
                </RadioGroup>
            )
        } else if (!loading && addresses && !active) {
            return (
                <RadioGroup  onChange={(value) => dispatch(setActiveAddress(value))}>
                    {
                        Object.keys(addresses).map((key) => (
                            <RadioButton key={key} pointColor="#26c7bf" rootColor="#000" value={key}>
                                <RenderAddress address={addresses[key]} index={key} />
                            </RadioButton>
                        ))
                    }
                </RadioGroup>
            )
        } else {
            return (<div></div>)
        }
    }

    const RenderAddress = ({ address, index }) => {
        var state = address.state ? (region.states.find(x => x.value === address.state)).label : null;
        var city = address.city && address.state ?
            (region.states.find(x => x.value === address.state)).cities.find(
                x => x.value === address.city
            ).label
            : null;

        var address1 = address.address1 ? address.address1 : '';
        var address2 = address.address2 ? address.address2 : '';

        return (
            <>
                <div style={{ direction: 'rtl' }}>
                    {'ایران' + '-' + state + '-' + city + '-' + address1 + '-' + address2}
                    <img
                        className="user-info-box__bot__title__icon"
                        onClick={(e) => handleRemoveModal(e, index)}
                        src={`/image/icon/Path 82.png`}
                        alt="dlt"
                    />
                    <img
                        className="user-info-box__bot__title__icon"
                        onClick={(e) => handleEditModal(e, index)}
                        src={`/image/icon/edit (1).png`}
                        alt="edit"
                    />
                </div>
                {address.postcode ? (
                    <div className="user-info-box__bot__body__address-code">
                        {address.postcode}
                    </div>
                ) : null}
            </>

        )
    }

    return (
        <>
            <div className="user-info-box__bot">
                <div className="user-info-box__bot__title">
                    <h3 className="user-info-box__bot__title__text">آدرس ها</h3>
                    <img
                        className="user-info-box__bot__title__icon"
                        onClick={() => handleAddModal()}
                        src={`/image/icon/edit (1).png`}
                        alt="edit"
                    />
                </div>
                <div className="user-info-box__bot__body">
                    <div className="user-info-box__bot__body-wrap">
                        <RenderAddresses />
                    </div>
                </div>
            </div>
            {/* <UserAddressModal show={modalShow} onHide={() => setModalShow(false)} /> */}
            <UserAddressAddModal show={modalShow} onHide={() => setModalShow(false)} isEdit={isEdit} editId={editId} />
        </>
    )
}