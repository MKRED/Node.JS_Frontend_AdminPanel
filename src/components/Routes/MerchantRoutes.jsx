import React from "react";
import { Route, Switch } from "react-router-dom";
import MerchantList from "../Merchant/MerchantList";
import MerchantTerms from "../Merchant/MerchantTerms";

const MerchantRoutes = () => {
  return (
    <Switch>
      <Route path="/merchant/list">
        <MerchantList />
      </Route>
      <Route path="/merchant/terms">
        <MerchantTerms />
      </Route>
    </Switch>
  );
};

export default MerchantRoutes;
