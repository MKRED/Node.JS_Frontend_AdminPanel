import React from "react";
import { CButton, CFormInput } from "@coreui/react";

const EditorSubscription = () => {
  return (
    <>
      <div className="m-5 fs-5  ">
        <div className="m-auto w-50 border">
          <div className="d-flex align-items-center justify-content-end m-1">
            <span className="fs-6">* for each:</span>
            <CFormInput className="w-25" />
          </div>
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

export default EditorSubscription;
