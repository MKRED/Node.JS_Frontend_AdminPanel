import React from "react";
import styles from "../order.module.css";
import OrderDetailInfo from "./OrderDetailInfo";
import OrderPaymentInfo from "./OrderPaymentInfo";
import OrderProductInfo from "./OrderProductInfo";
import print from "../../../../assets/printer.png";
import { CButton } from "@coreui/react";

const OrderCancellationDetail = () => {
  return (
    <div className={styles.detail}>
      <div className="m-5 mt-3 me-2">
        <div className="text-end">
          <CButton className="p-1" color="dark" variant="outline">
            <img src={print} alt="" className={styles.print} />
          </CButton>
        </div>
        <h5 className="text-center m-0">Order Details</h5>
        <div className="d-flex">
          <OrderDetailInfo />
          <OrderPaymentInfo />
        </div>
        <OrderProductInfo />
      </div>
    </div>
  );
};

export default OrderCancellationDetail;
