import React from "react";
import styles from "./sponsor.module.css";

const SponsorAdListTitlePattern = () => {
  return (
    <div className="mt-4">
      <p className="m-0">Upload Information</p>
      <div className="d-flex mt-1">
        <div className={styles.desc}>Region</div>
        <input type="text" className="me-3" />
        <div className={styles.desc}>Maker</div>
        <input type="text" className="me-3" />
        <div className={styles.desc}>Year</div>
        <input type="text" className="me-3" />
        <div className={styles.desc}>Model</div>
        <input type="text" />
      </div>
      <div className="mt-3 d-flex">
        <div className={styles.desc}>Sub Model</div>
        <input type="text" className="me-3" />
        <div className={styles.desc}>Series</div>
        <input type="text" />
      </div>
    </div>
  );
};

export default SponsorAdListTitlePattern;
