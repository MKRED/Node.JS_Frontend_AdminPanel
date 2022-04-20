import React from "react";
import styles from "./coupon.module.css";
import { CButton, CFormCheck } from "@coreui/react";

const CouponSelectManual = () => {
  return (
    <div className="mt-4">
      <h6>Search for issued members</h6>
      <div className="d-flex justify-content-center mt-4">
        <span className={styles.desc}>Search Term</span>
        <select className="ms-2">
          <option>All</option>
          <option>Active</option>
          <option>Suspended</option>
          <option>Secession</option>
        </select>
        <input type="text" className="me-2 ms-2" />
        <span className={styles.desc}>Membership Level</span>
        <div className={styles.checks}>
          <input type="checkbox" className="me-1" />
          <span className="me-2">Beginner</span>
          <input type="checkbox" className="me-1" />
          <span className="me-2">Advanced</span>
          <input type="checkbox" className="me-1" />
          <span className="me-2">Expert</span>
          <input type="checkbox" className="me-1" />
          <span>Master</span>
        </div>
        <CButton color="dark" className="me-2 ms-2">
          Search
        </CButton>
        <CButton color="dark">Reset</CButton>
      </div>
      <div className="d-flex justify-content-center">
        <table className={styles.table} border={1}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Country</th>
              <th>Member Level</th>
              <th>Join Date</th>
              <th>
                <CButton color="light" variant="outline">
                  Issued
                </CButton>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>000001</td>
              <td>Ivan</td>
              <td>google@gmail.com</td>
              <td>010-xxxx-xxxx</td>
              <td>USA</td>
              <td>Master</td>
              <td>2012.12.12</td>
              <td>
                <CFormCheck />
              </td>
            </tr>
            <tr>
              <td>000001</td>
              <td>Ivan</td>
              <td>google@gmail.com</td>
              <td>010-xxxx-xxxx</td>
              <td>USA</td>
              <td>Master</td>
              <td>2012.12.12</td>
              <td>
                <CFormCheck />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponSelectManual;
