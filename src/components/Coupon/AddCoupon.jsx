import React from "react";
import AddCouponBasic from "./AddCouponBasic";
import AddCouponDetailed from "./AddCouponDetailed";

const AddCoupon = () => {
  return (
    <div className="container p-0">
      <h5 className="mt-3 ms-3">Add Coupon</h5>
      <hr />
      <div className="ms-3">
        <AddCouponBasic />
        <AddCouponDetailed />
      </div>
    </div>
  );
};

export default AddCoupon;
