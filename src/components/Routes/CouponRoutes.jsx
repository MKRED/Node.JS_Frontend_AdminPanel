import React from "react";
import { Route, Switch } from "react-router-dom";
import AddCoupon from "../Coupon/AddCoupon";
import CouponList from "../Coupon/CouponList";

const CouponRoutes = () => {
  return (
    <Switch>
      <Route path="/coupon/list">
        <CouponList />
      </Route>
      <Route path="/coupon/add">
        <AddCoupon />
      </Route>
    </Switch>
  );
};

export default CouponRoutes;
