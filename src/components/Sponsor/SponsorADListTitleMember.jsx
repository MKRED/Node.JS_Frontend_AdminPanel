import React from "react";
import styles from "./sponsor.module.css";

const SponsorAdListTitleMember = () => {
  return (
    <>
      <p className="m-0 mt-3">Upload Information</p>
      <div className="d-flex">
        <span className={styles.desc}>Name</span>
        <input type="text" className="me-3" />
        <div className="d-flex me-3">
          <div className={styles.desc}>Date</div>
          <input type="date" />
          <span className="me-2 ms-2">~</span>
          <input type="date" className="me-4" />
        </div>
        <span className={styles.desc}>Code</span>
        <input type="text" />
      </div>
    </>
  );
};

export default SponsorAdListTitleMember;
