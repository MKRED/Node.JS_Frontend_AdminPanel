import React from "react";
import { Route, Switch } from "react-router-dom";
import CreditProduct from "../Credit/CreditProduct";
import Gift from "../Credit/Gift";
import RefundList from "../Credit/Refund/RefundList";
import PurchaseHistoryList from "../Credit/Purchase/PurchaseHistoryList";

const CreditRoutes = () => {
  return (
    <>
      <Switch>
        <Route path="/credit/product">
          <CreditProduct />
        </Route>
        <Route path="/purchase/list">
          <PurchaseHistoryList />
        </Route>
        <Route path="/refund/list">
          <RefundList />
        </Route>
        <Route path="/gift/management">
          <Gift />
        </Route>
      </Switch>
    </>
  );
};

export default CreditRoutes;
