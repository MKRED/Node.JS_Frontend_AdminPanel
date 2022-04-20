import React from "react";
import { NavLink } from "react-router-dom";
import PatternUnitPrice from "./PatternUnitPrice";

const ServiceUsePrice = () => {
  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Preferences - Service use unit price</h5>
      <hr />
      <div className="ms-3 me-3">
        <div className="border">
          <div className="d-flex border-bottom p-2 bg-secondary">
            <NavLink to="#" className="text-black fs-5">
              Pattern Unit Price
            </NavLink>
            <NavLink to="#" className="text-black fs-5">
              Editor Subscription Fee
            </NavLink>
            <NavLink to="#" className="text-black fs-5">
              Cutting Fee
            </NavLink>
            <NavLink to="#" className="text-black fs-5">
              Profit Fee
            </NavLink>
          </div>
          <PatternUnitPrice />
        </div>
      </div>
    </div>
  );
};

export default ServiceUsePrice;
