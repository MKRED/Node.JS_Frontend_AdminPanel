import React from "react";
import { Route, Switch } from "react-router-dom";
import BannersList from "../Banner/BannersList";
import AddBanner from "../Banner/AddBanner";

const BannerRoutes = () => {
  return (
    <Switch>
      <Route path="/banners/list">
        <BannersList />
      </Route>
      <Route path="/banner/add">
        <AddBanner />
      </Route>
    </Switch>
  );
};

export default BannerRoutes;
