import React from "react";
import styles from "./sponsor.module.css";

const SponsorAdListTable = () => {
  return (
    <table className={styles.table} border={1}>
      <thead>
        <tr>
          <th>Code</th>
          <th>Uploader</th>
          <th>Pattern Code</th>
          <th>Profit</th>
          <th>Credit</th>
          <th>Paypal</th>
          <th>Beggin</th>
          <th>End</th>
          <th>Registration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>000001</td>
          <td>YOUA</td>
          <td>ZCZX-1232-ASD5</td>
          <td>-</td>
          <td>10</td>
          <td>20</td>
          <td>2021.09.13</td>
          <td>2021.09.26</td>
          <td>3</td>
        </tr>
        <tr>
          <td>000002</td>
          <td>Aiara</td>
          <td>ZCZX-1232-ASD5</td>
          <td>10</td>
          <td>10</td>
          <td>10</td>
          <td>2021.09.13</td>
          <td>2021.09.30</td>
          <td>12</td>
        </tr>
        <tr>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SponsorAdListTable;
