import React from "react";
import EditorMembersList from "../Member/Editor/EditorMembersList";
import { Route, Switch } from "react-router-dom";
import MembershipPolicy from "../Member/Policy";
import MembersList from "../Member/Inquiry/MembersList";

const MemberRoutes = () => {
  return (
    <Switch>
      <Route exact path="/inquiry/management">
        <MembersList />
      </Route>
      <Route path="/membership/policy">
        <MembershipPolicy />
      </Route>
      <Route path="/editor/subscription">
        <EditorMembersList />
      </Route>
    </Switch>
  );
};

export default MemberRoutes;
