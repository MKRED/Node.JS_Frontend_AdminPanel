import React from "react";
import { Route, Switch } from "react-router-dom";
import WithdrawalCompletedList from "../Withdrawal/WithdrawalCompleted/WithdrawalCompletedList";
import WithdrawalReceiptList from "../Withdrawal/WithdrawalReceipt/WithdrawalReceiptList";

const WithdrawalRoutes = () => {
  return (
    <Switch>
      <Route path="/withdrawal/receipt/list">
        <WithdrawalReceiptList />
      </Route>
      <Route path="/withdrawal/completed/list">
        <WithdrawalCompletedList />
      </Route>
    </Switch>
  );
};

export default WithdrawalRoutes;
