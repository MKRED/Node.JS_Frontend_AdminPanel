import React from "react";
import styles from "./product.module.css";

const UltrafitEditProductPrice = () => {
  return (
    <>
      <div className="d-flex mt-3">
        <div>
          <h6>Price</h6>
          <input type="text" className="me-3" />
        </div>
        <div>
          <h6>Inventory *</h6>
          <input type="text" className={styles.shortInp} />
        </div>
      </div>
      <div className="d-flex mt-3">
        <div>
          <h6>Option</h6>
          <input type="text" className={styles.shortInp} />
        </div>
        <div>
          <h6>Price</h6>
          <input type="text" className={styles.shortInp} />
        </div>
        <div>
          <h6>Weight</h6>
          <input type="text" className={styles.shortInp} />
        </div>
        <div>
          <h6>Inventory *</h6>
          <input type="text" className={styles.shortInp} />
        </div>
      </div>
      <div className="mt-2">
        <input type="text" className={styles.shortInp} />
        <input type="text" className={styles.shortInp} />
        <input type="text" className={styles.shortInp} />
        <input type="text" className={styles.shortInp} />
      </div>
    </>
  );
};

export default UltrafitEditProductPrice;
