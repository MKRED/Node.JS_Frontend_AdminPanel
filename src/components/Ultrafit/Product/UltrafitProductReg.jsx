import React from "react";
import { CButton } from "@coreui/react";
import styles from "./product.module.css";
import UltrafitProductRegDesc from "./UltrafitProductRegDesc";
import UltrafitProductRegPrice from "./UltrafitProductRegPrice";

const UltrafitProductReg = () => {
  return (
    <div className="container p-0">
      <div className="ms-3 mt-3">Product Management</div>
      <hr />
      <div className="ms-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Product Registration</h5>
          <CButton color="dark" className="me-5">
            Product Registration
          </CButton>
        </div>
        <div className="d-flex ">
          <div className="me-5">
            <div>
              <img src="" alt="" className={styles.changeImg} />
            </div>
            <input type="file" />
          </div>
          <div>
            <UltrafitProductRegDesc />
            <UltrafitProductRegPrice />
          </div>
        </div>
        <div className=" mt-3 mb-5">
          <h5>Product Introduction</h5>
          <textarea name="" id="" cols="135" rows="10"></textarea>
        </div>
      </div>
    </div>
  );
};

export default UltrafitProductReg;
