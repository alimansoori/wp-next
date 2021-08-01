import React, { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function (props) {
  const { authenticating } = useSelector(state => state.auth)

  return (
    <div className={authenticating ? "loading" : "hidden"}>
      <img className="loading__logo" src={`/image/Group 2.png`} alt="logo" />
    </div>
  )
}
