import React from "react";
import { CButton, CFormInput } from "@coreui/react";

const ProfitFee = () => {
  return (
    <>
      <div className="m-5 mt-0 fs-5">
        <div className="border bg-secondary w-50 m-auto d-flex mb-3">
          <CButton
            color="black"
            variant="outline"
            className="border-0 shadow-none"
          >
            Beginner
          </CButton>
          <CButton
            color="black"
            variant="outline"
            className="border-0 shadow-none"
          >
            Advanced
          </CButton>
          <CButton
            color="black"
            variant="outline"
            className="border-0 shadow-none"
          >
            Expert
          </CButton>
          <CButton
            color="black"
            variant="outline"
            className="border-0 shadow-none"
          >
            Master
          </CButton>
        </div>
        <div className="m-auto w-50 border">
          <div className="d-flex justify-content-center align-items-center  mt-5">
            <span>Present:</span>
            <CFormInput className="w-50 ms-3" />
          </div>
          <div className="text-center fs-1 m-3">▼</div>
          <div className="d-flex justify-content-center mb-5">
            <span className>Change Value:</span>
            <CFormInput className="w-50 me-5 ms-3" />
          </div>
        </div>
      </div>
      <div className="text-center mb-4">
        <CButton
          color="dark"
          variant="outline"
          className="me-3 pe-5 ps-5"
          size="lg"
        >
          SAVE
        </CButton>
        <CButton color="dark" variant="outline" className="pe-5 ps-5" size="lg">
          RESET
        </CButton>
      </div>
    </>
  );
};

export default ProfitFee;
