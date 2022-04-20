import React from "react";
import styles from "./signIn.module.css";
import logo from "../../assets/PLOFIX_BI.jpg";

const SignInPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contBg}>
        <div className={styles.contIcon}>
          <img src={logo} alt="" />
        </div>
      </div>
      <div className={styles.formInput}>
        <div className={styles.text}>Email:</div>
        <input type="text" className={styles.inp} />
      </div>
      <div className={styles.formInput}>
        <div className={styles.text}>Password:</div>
        <input type="password" className={styles.inp} />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <div>
          <input type="checkbox" />
          <span className="ms-2">Auto Login</span>
        </div>
        <button className={styles.btn}>log in</button>
      </div>
    </div>
  );
};

export default SignInPage;
