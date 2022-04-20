import React from "react";
import { Route, Switch } from "react-router-dom";
import ServiceUsePrice from "../Prefences/ServiceUsePrice";
import SettingShippingFee from "../Prefences/SettingShippingFee";
import AdminSettings from "../Prefences/AdminSettings";

const PreferencesRoutes = () => {
  return (
    <Switch>
      <Route path="/service/unit/price">
        <ServiceUsePrice />
      </Route>
      <Route path="/admin/settings">
        <AdminSettings />
      </Route>
      <Route path="/shipping/setting">
        <SettingShippingFee />
      </Route>
    </Switch>
  );
};

export default PreferencesRoutes;
