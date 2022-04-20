import React from "react";
import { CButton, CFormInput, CFormSelect } from "@coreui/react";

const AddCouponDetailed = () => {
  return (
    <div className="mt-4">
      <h5>Coupon detailed settings</h5>
      <div>
        <div className="d-flex align-items-center">
          <div className="w-auto">Minimum Issued Amount: </div>
          <span className="me-3 ms-3 ">
            Issued amount when the purchase amount is{" "}
          </span>
          <CFormInput className="w-auto me-3" />
          <span>$ or more</span>
        </div>
        <div className="d-flex align-items-center mt-2">
          <div className="w-auto">Set minimum purchase amount: </div>
          <span className="me-3 ms-3 ">
            Available when the minimum purchase amount is
          </span>
          <CFormInput className="w-auto me-3" />
          <span>$ or more</span>
        </div>
        <span>Purchase Quantity Fulfillment Coupon</span>
        <div className="d-flex align-items-start mt-1">
          <span>Set discount rate:</span>
          <div className="ms-5">
            <h6>Please select a product category</h6>
            <div className="d-flex align-items-center">
              <span>1 Dept:</span>
              <CFormSelect className="w-auto">
                <option>-</option>
                <option>Windshield protection</option>
              </CFormSelect>
            </div>
            <div className="d-flex align-items-center mt-1">
              <span>2 Dept:</span>
              <CFormSelect className="w-auto">
                <option>-</option>
                <option>Windshield protection</option>
              </CFormSelect>
            </div>
            <div className="d-flex align-items-center mt-1">
              <span>3 Dept:</span>
              <CFormSelect className="w-auto">
                <option>-</option>
                <option>Windshield protection</option>
              </CFormSelect>
            </div>
            <div className="d-flex align-items-start mt-3">
              <div>
                <CFormInput type="text" className="w-50" />
                <CButton color="dark" variant="outline" className="border-0 ">
                  +
                </CButton>
              </div>
              <span className="me-2 ms-2">buy</span>
              <CFormSelect className="w-auto">
                <option>$</option>
              </CFormSelect>
              <span className="ms-2">D/C</span>
            </div>
          </div>
          <div className="ms-5">
            <span>Product:</span>
            <CFormSelect>
              <option>ULTAFIT XR CRYSTAL</option>
            </CFormSelect>
          </div>
        </div>
      </div>
      <div className="text-center">
        <CButton color="dark">Add Coupon</CButton>
      </div>
    </div>
  );
};

export default AddCouponDetailed;
