import React from "react";
import { CButton } from "@coreui/react";
import AddBannerTable from "./AddBannerTable";

const AddBanner = () => {
  return (
    <div className="container p-0">
      <h5 className="mt-3 ms-3">Banner Management - Banner Add</h5>
      <hr />
      <div className="ms-3 me-3">
        <AddBannerTable />
        <div className="text-center mt-3">
          <CButton color="dark" className="me-3">
            Confirm
          </CButton>
          <CButton color="dark">Cancel</CButton>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
