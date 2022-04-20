import React from "react";
import { CButton } from "@coreui/react";

const CouponListPagination = () => {
  return (
    <div className="text-center mt-3">
      <CButton color="dark" variant="outline" className="me-1">
        {"<<"}
      </CButton>
      <CButton color="dark" variant="outline" className="me-1">
        {"<"}
      </CButton>
      <CButton color="dark" variant="outline" className="me-1">
        1
      </CButton>
      <CButton color="dark" variant="outline" className="me-1">
        >
      </CButton>
      <CButton color="dark" variant="outline" className="me-1">
        >>
      </CButton>
    </div>
  );
};

export default CouponListPagination;
