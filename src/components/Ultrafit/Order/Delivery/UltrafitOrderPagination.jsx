import React from "react";
import { CButton } from "@coreui/react";

const nums = ["<<", "<", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ">", ">>"];

const UltrafitOrderPagination = () => {
  return (
    <div className="text-center mt-5">
      {nums.map((num) => {
        return (
          <CButton color="dark" variant="outline" className="me-1">
            {num}
          </CButton>
        );
      })}
    </div>
  );
};

export default UltrafitOrderPagination;
