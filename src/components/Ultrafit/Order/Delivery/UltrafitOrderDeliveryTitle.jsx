import React from "react";
import { CButton, CFormInput, CFormSelect } from "@coreui/react";

const UltrafitOrderDeliveryTitle = () => {
  return (
    <div className="me-5">
      <div className="d-flex align-items-center border p-3 bg-secondary  ">
        <span className="me-5">Date</span>
        <CFormInput type="date" className="w-auto" />
        <span className="pe-2 ps-2">-</span>
        <CFormInput type="date" className="w-auto me-3" />
        <CButton color="light" className="me-2 text-dark border-dark">
          Today
        </CButton>
        <CButton color="light" className="me-2 text-dark border-dark">
          Yesterday
        </CButton>
        <CButton color="light" className="me-2 text-dark border-dark">
          Week
        </CButton>
        <CButton color="light" className="me-2 text-dark border-dark">
          Month
        </CButton>
      </div>
      <div className="d-flex align-items-center p-3 border bg-secondary ">
        <span className="me-5">Search</span>
        <CFormSelect className="w-auto">
          <option>Code</option>
          <option>Date</option>
          <option>Name</option>
        </CFormSelect>
        <CFormInput className="w-auto ms-5 me-2" />
        <CButton color="dark" className="me-5">
          Search
        </CButton>
        <CButton color="dark" className="me-2">
          New Order(1)
        </CButton>
        <CButton color="dark" className="me-2">
          Order Receipt(1)
        </CButton>
        <CButton color="dark">Shipping(6)</CButton>
      </div>
    </div>
  );
};

export default UltrafitOrderDeliveryTitle;
