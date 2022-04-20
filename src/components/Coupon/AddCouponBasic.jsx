import React from "react";
import { CFormCheck, CFormInput, CFormSelect } from "@coreui/react";
import styles from "./coupon.module.css";

const AddCouponBasic = () => {
  return (
    <div>
      <h5>Basic Setting</h5>
      <div>
        <div className="d-flex">
          <div className={styles.info}>Coupon Type:</div>
          <div className="me-3">
            <CFormCheck /> Discount Coupon
          </div>
          <div>
            <CFormCheck /> Shipping Fee Free Coupon
          </div>
        </div>
        <div className="d-flex align-items-center mt-1">
          <div className={styles.info}>Issuance Type:</div>
          <div className="me-3">
            <CFormCheck />
            Conditional
          </div>
          <div>
            <CFormSelect>
              <option>Sign up</option>
              <option>First-time customer</option>
              <option>Satisfy purchase quantity</option>
              <option>Satisfy the purchase amount </option>
            </CFormSelect>
          </div>
        </div>
        <div className="d-flex align-items-center mt-1">
          <div className={styles.info}>Coupon Name:</div>
          <div>
            <input type="text" className={styles.inp} />
          </div>
        </div>
        <div className="d-flex align-items-center mt-1">
          <div className={styles.info}>Coupon Description:</div>
          <div>
            <input type="text" className={styles.inp} />
          </div>
        </div>
        <div className="d-flex align-items-center mt-1">
          <div className={styles.info}>Date of use:</div>
          <div>
            <input type="date" />
            <input type="time" className="ms-2" />
            <span className="ms-3 me-3">~</span>
            <input type="date" />
            <input type="time" className="ms-2" />
          </div>
        </div>
        <div className="d-flex align-items-center mt-4">
          <div className="w-auto me-3">Coupon benefit amount setting:</div>
          <div className="d-flex">
            <CFormInput className="me-3" />
            <CFormSelect className="w-auto">
              <option>$</option>
            </CFormSelect>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCouponBasic;
