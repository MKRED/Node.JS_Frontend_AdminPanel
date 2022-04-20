import React from "react";
import styles from "./sponsor.module.css";
import { CButton } from "@coreui/react";

const SponsorAdItemPrice = () => {
  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Sponsor AD Item - Sponsor AD Item Price</h5>
      <hr />
      <div className={styles.content}>
        <div className={styles.head}>Sponsor ID Item Price</div>
        <div className="m-5">
          <div className={styles.container}>
            <div className="text-end">
              *
              <input type="text" className={styles.inp} />
              <span>for each</span>
            </div>
            <div className="d-flex justify-content-center  mt-5">
              <p className={styles.price}>Present:</p>
              <input type="text" className={styles.inp} />
            </div>
            <div className={styles.arrow}>▼</div>
            <div className="d-flex justify-content-center mb-5">
              <p className={styles.price}>Change Value:</p>
              <input type="text" className={styles.inp} />
            </div>
          </div>
        </div>
        <div className="text-center mb-4">
          <CButton
            color="dark"
            variant="outline"
            className="me-3 pe-5 ps-5"
            size="lg"
          >
            SAVE
          </CButton>
          <CButton
            color="dark"
            variant="outline"
            className="pe-5 ps-5"
            size="lg"
          >
            RESET
          </CButton>
        </div>
      </div>
    </div>
  );
};

export default SponsorAdItemPrice;
