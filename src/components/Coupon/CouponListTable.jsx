import React from "react";
import { CFormCheck, CFormSelect } from "@coreui/react";
import styles from "./coupon.module.css";

const CouponListTable = () => {
  return (
    <table border={1} className={styles.tableList}>
      <thead>
        <tr>
          <th>
            <CFormCheck />
            <span className="ms-1">Coupon No.</span>
          </th>
          <th>Coupon Name</th>
          <th>Benefits</th>
          <th>Date of use</th>
          <th>Issuance</th>
          <th>Issuance Classification</th>
          <th>State</th>
          <th>Issuance status</th>
        </tr>
      </thead>
      <tbody className={styles.body}>
        <tr>
          <td>
            <CFormCheck />
            <span className="ms-2">0002154</span>
          </td>
          <td>Get $100 off your purchase of $00 or more</td>
          <td>100$ D/C</td>
          <td>22.03.03 - 21.02.02</td>
          <td>1</td>
          <td>conditional</td>
          <td>
            <CFormSelect>
              <option>Issuing</option>
            </CFormSelect>
          </td>
          <td>completed</td>
        </tr>
        <tr>
          <td>
            <CFormCheck />
            <span className="ms-2">0002154</span>
          </td>
          <td>Get $100 off your purchase of $00 or more</td>
          <td>free shipping</td>
          <td>22.03.03 - 21.02.02</td>
          <td>2</td>
          <td>conditional</td>
          <td>
            <CFormSelect>
              <option>Issuing</option>
            </CFormSelect>
          </td>
          <td>completed</td>
        </tr>
        <tr>
          <td>
            <CFormCheck />
            <span className="ms-2">0002154</span>
          </td>
          <td>Get $100 off your purchase of $00 or more</td>
          <td>100$ D/C</td>
          <td>22.03.03 - 21.02.02</td>
          <td>3</td>
          <td>conditional</td>
          <td>
            <CFormSelect>
              <option>Issuing</option>
            </CFormSelect>
          </td>
          <td>Stop</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CouponListTable;
