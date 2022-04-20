import React from "react";
import { Route, Switch } from "react-router-dom";
import AutomatedEmail from "../Email/AutomatedEmail";
import MailingList from "../Email/MailingList";

const EmailRoutes = () => {
  return (
    <Switch>
      <Route path="/email/list">
        <AutomatedEmail />
      </Route>
      <Route path="/mailing/list">
        <MailingList />
      </Route>
    </Switch>
  );
};

export default EmailRoutes;
