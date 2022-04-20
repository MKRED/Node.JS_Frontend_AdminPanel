import React from "react";
import { Route, Switch } from "react-router-dom";
import SponsorAdItemList from "../Sponsor/SponsorADItemList";
import SponsorAdItemPrice from "../Sponsor/SponsorADItemPrice";

const SponsorRoutes = () => {
  return (
    <Switch>
      <Route path="/sponsor/ad/item/list">
        <SponsorAdItemList />
      </Route>
      <Route path="/sponsor/ad/item/price">
        <SponsorAdItemPrice />
      </Route>
    </Switch>
  );
};

export default SponsorRoutes;
