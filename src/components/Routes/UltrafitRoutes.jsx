import React from "react";
import { Route, Switch } from "react-router-dom";
import Category from "../Ultrafit/Category";
import UltrafitOrderDeliveryList from "../Ultrafit/Order/Delivery/UltrafitOrderDeliveryList";
import CancellationList from "../Ultrafit/Order/Cancellation/CancellationList";
import UltrafitProductList from "../Ultrafit/Product/UltrafitProductList";

const UltrafitRoutes = () => {
  return (
    <Switch>
      <Route path="/ultrafit/products/list">
        <UltrafitProductList />
      </Route>
      <Route path="/ultrafit/category">
        <Category />
      </Route>
      <Route path="/ultrafit/order/delivery">
        <UltrafitOrderDeliveryList />
      </Route>
      <Route path="/ultrafit/order/cancellation">
        <CancellationList />
      </Route>
    </Switch>
  );
};

export default UltrafitRoutes;
