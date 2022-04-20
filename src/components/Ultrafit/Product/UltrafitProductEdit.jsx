import React from "react";
import { CButton } from "@coreui/react";
import styles from "./product.module.css";
import UltrafitEditProductDesc from "./UltrafitEditProductDesc";
import UltrafitEditProductPrice from "./UltrafitEditProductPrice";
import UltrafitProductEditIntro from "./UltrafitProductEditIntro";

const UltrafitProductEdit = () => {
  return (
    <div className="container p-0">
      <div className="ms-3 mt-3">Product Management</div>
      <hr />
      <div className="ms-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Product Edit</h5>
          <CButton color="dark" className="me-5">
            Product Edit
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
            <UltrafitEditProductDesc />
            <UltrafitEditProductPrice />
          </div>
        </div>
        <UltrafitProductEditIntro />
      </div>
    </div>
  );
};

export default UltrafitProductEdit;
