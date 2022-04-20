import React from "react";
import CouponInfo from "./CouponInfo";
import CouponSearchMembers from "./CouponSearchMembers";
import CouponSelectManual from "./CouponSelectManual";

const CouponDetail = () => {
  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Coupon List - Details</h5>
      <hr />
      <div className="ms-3 me-3">
        <CouponInfo />
        <CouponSearchMembers />
        <CouponSelectManual />
      </div>
    </div>
  );
};

export default CouponDetail;
