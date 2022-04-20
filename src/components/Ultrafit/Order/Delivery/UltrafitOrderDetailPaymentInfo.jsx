import React from "react";
import styles from "../order.module.css";

const UltrafitOrderDetailPaymentInfo = () => {
  return (
    <table className={styles.detailTable}>
      <tr>
        <th colSpan={2}>Order Information</th>
      </tr>
      <tr>
        <td className="bg-secondary">Total Price</td>
        <td>$ 800</td>
      </tr>
      <tr>
        <td className="bg-secondary">D/C Price</td>
        <td>$ 76</td>
      </tr>
      <tr>
        <td className="bg-secondary">Coupon</td>
        <td>$ 86</td>
      </tr>
      <tr>
        <td className="bg-secondary">Profit</td>
        <td>$ 21</td>
      </tr>
      <tr>
        <td className="bg-secondary">Credit</td>
        <td>$ 20</td>
      </tr>
      <tr>
        <td className="bg-secondary">Amounts</td>
        <td>$ 648</td>
      </tr>
    </table>
  );
};

export default UltrafitOrderDetailPaymentInfo;
