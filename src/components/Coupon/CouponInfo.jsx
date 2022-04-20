import React from "react";
import styles from "./coupon.module.css";

const CouponInfo = () => {
  return (
    <div>
      <h6>Coupon Information</h6>
      <div className="d-flex justify-content-between">
        <div>
          <div className="d-flex">
            <div className={styles.info}>Issuance status:</div>
            <div>Issuing</div>
          </div>
          <div className="d-flex">
            <div className={styles.info}>Coupon type:</div>
            <div>amount discount coupon</div>
          </div>
          <div className="d-flex">
            <div className={styles.info}>Issuance method:</div>
            <div>conditional issuance</div>
          </div>
          <div className="d-flex">
            <div className={styles.info}>Coupon Name:</div>
            <div>Get $100 off your purchase of $00 or more</div>
          </div>
        </div>

        <div>
          <div className="d-flex">
            <div className={styles.info}>Description:</div>
            <div className="w-50">
              Issued to customers who purchase more than a certain amount
            </div>
          </div>
          <div className="d-flex">
            <div className={styles.info}>Date of use:</div>
            <div>2021.01.01 ~ 2012.20.20</div>
          </div>
          <div className="d-flex">
            <div className={styles.info}>Benefits:</div>
            <div>100$ discount</div>
          </div>
          <div className="d-flex">
            <div className={styles.info}>Number of issuance:</div>
            <div>123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponInfo;
