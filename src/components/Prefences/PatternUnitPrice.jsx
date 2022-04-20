import React from "react";
import { CButton, CFormInput } from "@coreui/react";

const PatternUnitPrice = () => {
  return (
    <>
      <div className="m-5">
        <div className="m-auto w-50 border">
          <div className="text-end mt-2 d-flex justify-content-end align-items-center">
            *
            <CFormInput className="w-25" />
            <span>for each</span>
          </div>
          <div className="d-flex justify-content-center">
            <ol className="fw-bold fs-5">
              <li>
                <CFormInput className="w-100 ms-3 mt-3" />
              </li>
              <li>
                <CFormInput className="w-100 mt-3 ms-3" />
              </li>
              <li>
                <CFormInput className="w-100 mt-3 ms-3" />
              </li>
              <li>
                <CFormInput className="w-100 mt-3 ms-3" />
              </li>
            </ol>
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

export default PatternUnitPrice;
