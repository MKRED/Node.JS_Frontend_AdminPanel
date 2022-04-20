import React from "react";
import CouponListSearch from "./CouponListSearch";
import CouponListTable from "./CouponListTable";
import { CButton } from "@coreui/react";
import CouponListPagination from "./CouponListPagination";

const CouponList = () => {
  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Coupon List</h5>
      <hr />
      <div className="ms-3 me-4">
        <span className="bg-dark text-white p-2">Coupon List</span>
        <CouponListSearch />
        <CButton color="dark" className="mt-3">
          Delete
        </CButton>
        <CouponListTable />
        <CouponListPagination />
      </div>
    </div>
  );
};

export default CouponList;
