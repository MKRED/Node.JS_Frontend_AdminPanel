import React from "react";
import { Route, Switch } from "react-router-dom";
import Vehicle from "../Pattern/Category/Vehicle";
import Detailed from "../Pattern/Category/Detailed";
import MissCutList from "../Pattern/Miss Cut/MissCutList";
import PatternList from "../Pattern/List/PatternList";
import ApprovalList from "../Pattern/Aprroval/ApprovalList";

const PatternRoutes = () => {
  return (
    <Switch>
      <Route path="/pattern/approval/list">
        <ApprovalList />
      </Route>
      <Route path="/pattern/list">
        <PatternList />
      </Route>
      <Route path="/pattern/category/vehicle/management">
        <Vehicle />
      </Route>
      <Route path="/pattern/detailed/category/management">
        <Detailed />
      </Route>
      <Route path="/pattern/miss">
        <MissCutList />
      </Route>
    </Switch>
  );
};

export default PatternRoutes;
