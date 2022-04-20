import React from "react";
import { CFormSelect } from "@coreui/react";

const UltrafitEditProductDesc = () => {
  return (
    <>
      <div>
        <h6>* Please enter the product name. </h6>
        <input type="text" />
      </div>
      <div className="mt-2">
        <h6>* Please select a product category</h6>
        <div className="d-flex align-items-center">
          <span className="text-center w-25">1 Dept:</span>
          <CFormSelect>
            <option>WindShield Protection</option>
          </CFormSelect>
        </div>
        <div className="d-flex align-items-center mt-2">
          <span className="text-center w-25">2 Dept:</span>
          <CFormSelect>
            <option>WindShield Protection</option>
          </CFormSelect>
        </div>
        <div className="d-flex align-items-center mt-2">
          <span className="text-center w-25">3 Dept:</span>
          <CFormSelect>
            <option>WindShield Protection</option>
          </CFormSelect>
        </div>
      </div>
    </>
  );
};

export default UltrafitEditProductDesc;
