import React from "react";
import { CButton } from "@coreui/react";
import UltrafitOrderDeliveryTable from "./UltrafitOrderDeliveryTable";
import UltrafitOrderPagination from "./UltrafitOrderPagination";
import UltrafitOrderDeliveryTitle from "./UltrafitOrderDeliveryTitle";

const UltrafitOrderDeliveryList = () => {
  return (
    <div className="container p-0">
      <div className="ms-3 mt-3">Order Delivery Management</div>
      <hr />
      <div className="ms-3">
        <UltrafitOrderDeliveryTitle />
        <div className="text-end mt-5 me-5">
          <div>
            <input type="checkbox" className="me-2" />
            <span>Apply current search filter</span>
          </div>
          <div>
            <CButton color="dark" variant="outline">
              Excel File Download
            </CButton>
          </div>
          <CButton color="dark" size="lg" className="mt-2">
            Print Order Form
          </CButton>
        </div>
        <UltrafitOrderDeliveryTable />
        <UltrafitOrderPagination />
        <div></div>
      </div>
    </div>
  );
};

export default UltrafitOrderDeliveryList;
