import React from "react";
import styles from "../order.module.css";

const UltrafitOrderDetailInfo = () => {
  return (
    <table className={styles.detailTable}>
      <tr>
        <th colSpan={2} className="border-bottom-1">
          Order Information
        </th>
      </tr>
      <tr>
        <td className="bg-secondary">Date</td>
        <td>2021.01.01</td>
      </tr>
      <tr>
        <td className="bg-secondary">Ordered</td>
        <td>Anything</td>
      </tr>
      <tr>
        <td className="bg-secondary">Order No.</td>
        <td>0000001</td>
      </tr>
      <tr>
        <td className="bg-secondary">Shipping Info</td>
        <td>Not departing</td>
      </tr>
    </table>
  );
};

export default UltrafitOrderDetailInfo;
