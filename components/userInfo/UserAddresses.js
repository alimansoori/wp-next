import React from "react"
import { RadioGroup, RadioButton } from "react-radio-buttons"
import { useDispatch, useSelector } from "react-redux";
import { setActiveAddress } from "../../redux/actions/customer.actions";
import UserAddressModal from "../userAddressModal/UserAddressModal"

export default function UserAddresses() {
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = React.useState(false)
    const { addresses, active, loading } = useSelector(state => state.customer.address)
    const { region } = useSelector(state => state.local)

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
                <RadioGroup>
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
                        onClick={() => setModalShow(true)}
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
            <UserAddressModal show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}