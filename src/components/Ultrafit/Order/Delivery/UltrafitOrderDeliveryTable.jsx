import React, { useState } from "react";
import { CFormCheck, CFormInput, CFormSelect } from "@coreui/react";
import styles from "../order.module.css";
import UltrafitOrderDeliveryDetail from "./UltrafitOrderDeliveryDetail";

const UltrafitOrderDeliveryTable = () => {
  const [detail, setDetail] = useState(false);
  return (
    <table className={styles.table}>
      <tr className="border-bottom-1">
        <th>Code</th>
        <th>Date</th>
        <th>Name</th>
        <th>Payment</th>
        <th>Order Price</th>
        <th>D/C Price</th>
        <th>Amount of Payment</th>
        <th>State</th>
        <th>Shipping Information URL</th>
      </tr>
      {detail && <UltrafitOrderDeliveryDetail />}
      <tr className="border-bottom-1" onClick={() => setDetail(!detail)}>
        <td>000001</td>
        <td>2021.01.01</td>
        <td>Oleg</td>
        <td>Paypal</td>
        <td>2,562 USD</td>
        <td>123 USD</td>
        <td>2,439 USD</td>
        <td>
          <CFormSelect>
            <option>New Order</option>
            <option>Shipping</option>
            <option>Order Receipt</option>
          </CFormSelect>
        </td>
        <td className="d-flex align-items-center">
          <CFormInput type="text" className="w-75 ms-2 me-2" />
          <CFormCheck size="lg" />
        </td>
      </tr>
      <tr className="border-bottom-1">
        <td>000002</td>
        <td>2021.01.01</td>
        <td>Oleg</td>
        <td>Paypal</td>
        <td>2,562 USD</td>
        <td>123 USD</td>
        <td>2,439 USD</td>
        <td>
          <CFormSelect>
            <option>New Order</option>
            <option>Shipping</option>
            <option>Order Receipt</option>
          </CFormSelect>
        </td>
        <td className="d-flex align-items-center">
          <CFormInput type="text" className="w-75 ms-2 me-2" />
          <CFormCheck size="lg" />
        </td>
      </tr>
      <tr className="border-bottom-1">
        <td>000003</td>
        <td>2021.01.01</td>
        <td>Oleg</td>
        <td>Paypal</td>
        <td>2,562 USD</td>
        <td>123 USD</td>
        <td>2,439 USD</td>
        <td>
          <CFormSelect>
            <option>New Order</option>
            <option>Shipping</option>
            <option>Order Receipt</option>
          </CFormSelect>
        </td>
        <td className="d-flex align-items-center">
          <CFormInput type="text" className="w-75 ms-2 me-2" />
          <CFormCheck size="lg" />
        </td>
      </tr>
    </table>
  );
};

export default UltrafitOrderDeliveryTable;
