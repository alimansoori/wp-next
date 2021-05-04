import React from "react"
import { RadioGroup, RadioButton } from "react-radio-buttons"
import UserAddressModal from "../userAddressModal/UserAddressModal"

export default function UserAddresses() {
    const [modalShow, setModalShow] = React.useState(false);
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
                        <RadioGroup value={'2'}>
                            <RadioButton pointColor="#26c7bf" rootColor="#000" value="1">
                                ایران- تهران- خیابان- کوچه-پلاک
              </RadioButton>
                            <RadioButton pointColor="#26c7bf" rootColor="#000" value="2">
                                ایران- تهران- خیابان- کوچه-پلاک
              </RadioButton>
                            <RadioButton pointColor="#26c7bf" rootColor="#000" value="3">
                                ایران- تهران- خیابان- کوچه-پلاک
              </RadioButton>
                        </RadioGroup>
                    </div>
                </div>
            </div>
            <UserAddressModal show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}