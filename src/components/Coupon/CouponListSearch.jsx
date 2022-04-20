import React from "react";
import { CButton, CFormInput, CFormSelect } from "@coreui/react";

const CouponListSearch = () => {
  return (
    <>
      <table border={1} className="w-100 mt-3">
        <thead>
          <tr>
            <th className="bg-dark text-white p-2" colSpan={2}>
              Issuance Coupon Search
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border-end-1 w-50">
              <div className="d-flex align-items-center m-2 justify-content-start">
                <span>Coupon Name</span>
                <CFormInput className="w-auto ms-3" />
              </div>
              <div className="d-flex align-items-center m-2 mt-3">
                <span>Issuance Classification</span>
                <CFormSelect className="w-auto ms-3">
                  <option>All</option>
                </CFormSelect>
              </div>
            </td>
            <td>
              <div className="d-flex align-items-center m-2 ">
                <span>Benefit Classification</span>
                <CFormSelect className="w-25 ms-3">
                  <option>All</option>
                </CFormSelect>
              </div>
              <div className="d-flex align-items-center m-2 mt-3">
                <span>Applied Area</span>
                <CFormSelect className="w-auto ms-3">
                  <option>All</option>
                </CFormSelect>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-center mt-3 me-5">
        <CButton color="dark">Search</CButton>
      </div>
    </>
  );
};

export default CouponListSearch;
