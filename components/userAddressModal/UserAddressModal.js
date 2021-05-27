import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import UserAddressAddModal from "./UserAddressAddModal";
import UserShowAddressModal from "./UserShowAddressModal";

export default function UserAddressModal(props) {
  const [isAdd, setIsAdd] = useState(false)

  return (
    <div>
      {isAdd ? <UserAddressAddModal {...props} setIsAdd={setIsAdd} /> : <UserShowAddressModal {...props} setIsAdd={setIsAdd} />}
    </div>
  );
}