import React from "react";
import { useLocation } from "react-router-dom";
import Payment from "./Payment";
import Dashboard from "../Dashboard/Dashboard";

const PaymentHook = () => {
  const location = useLocation();

  if (location.state) {
    const { upgradeType, upgradeTotal } = location.state;
    return <Payment upgradeType={upgradeType} upgradeTotal={upgradeTotal} />;
  } else {
    //TODO: Change this
    return <Dashboard />;
  }
};

export default PaymentHook;
