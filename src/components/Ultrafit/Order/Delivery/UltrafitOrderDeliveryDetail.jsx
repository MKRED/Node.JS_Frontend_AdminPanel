import React from "react";
import styles from "../order.module.css";
import UltrafitOrderDetailInfo from "./UltrafitOrderDetailInfo";
import UltrafitOrderDetailPaymentInfo from "./UltrafitOrderDetailPaymentInfo";
import UltrafitOrderProductInfo from "./UltrafitOrderProductInfo";
import { CButton } from "@coreui/react";
import print from "../../../../assets/printer.png";

const UltrafitOrderDeliveryDetail = () => {
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
          <UltrafitOrderDetailInfo />
          <UltrafitOrderDetailPaymentInfo />
        </div>
        <UltrafitOrderProductInfo />
      </div>
    </div>
  );
};

export default UltrafitOrderDeliveryDetail;
