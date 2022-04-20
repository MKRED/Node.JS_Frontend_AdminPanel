import React from "react";
import { CButton, CFormInput, CFormSelect } from "@coreui/react";
import BannersListTable from "./BannersListTable";

const BannersList = () => {
  return (
    <div className="container p-0">
      <h5 className="mt-3 ms-3">Banners List</h5>
      <hr />
      <div className="ms-3 me-3 ">
        <div className="border">
          <div className="d-flex justify-content-center bg-dark p-2">
            <CFormSelect className="w-auto">
              <option>main category</option>
            </CFormSelect>
            <CFormInput className="w-50" />
          </div>
          <div className="d-flex align-items-center mt-3 p-2">
            <span>mean category</span>
            <CFormSelect className="w-auto me-3 ms-2">
              <option>some </option>
            </CFormSelect>
            <CFormSelect className="w-auto me-3">
              <option>any</option>
            </CFormSelect>
            <CFormSelect className="w-auto me-3">
              <option>some</option>
            </CFormSelect>
            <CFormSelect className="w-auto">
              <option>main</option>
            </CFormSelect>
          </div>
          <div className="d-flex align-items-center mt-2 p-2">
            <span>subcategory</span>
            <CFormSelect className="w-auto ms-4">
              <option>main</option>
            </CFormSelect>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <CButton color="dark" className="me-3">
            Search
          </CButton>
          <CButton color="dark">Reset</CButton>
        </div>
        <BannersListTable />
        <div className="text-center mt-3">
          <CButton color="dark" className="me-3 ms-4">
            Add
          </CButton>
          <CButton color="dark"> Delete</CButton>
        </div>
      </div>
    </div>
  );
};

export default BannersList;
