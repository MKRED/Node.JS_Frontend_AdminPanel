import React from "react";
import styles from "../order.module.css";
import { CButton } from "@coreui/react";

const OrderProductInfo = () => {
  return (
    <div className="mt-4">
      <h6>Order Product information</h6>
      <div className="d-flex align-items-center">
        <img src="" alt="" className={styles.detailImg} />
        <div className="me-3">ULTRAFIT WINCREST VS 35BK</div>
        <div className="me-3">1 EA</div>
        <div>
          <b>$ 600</b>
        </div>
      </div>
      <div className="d-flex mt-1 align-items-center">
        <img src="#" alt="" className={styles.detailImg} />
        <div className="me-3">ULTRAFIT WINCREST VS 35BK</div>
        <div className="me-3">1 EA</div>
        <div>
          <b>$ 400</b>
        </div>
      </div>
      <table className="w-75 mt-3">
        <tr className="border-top-1 border-bottom-1">
          <td className="bg-secondary">Country</td>
          <td>South Korea</td>
        </tr>
        <tr className="border-bottom-1">
          <td className="bg-secondary">Address</td>
          <td>Somewhere on left</td>
        </tr>
        <tr className="border-bottom-1">
          <td className="bg-secondary ">Address 2</td>
          <td>Straight ahead</td>
        </tr>
        <tr className="border-bottom-1">
          <td className="bg-secondary">Zip/Postal</td>
          <td>123-456</td>
        </tr>
        <tr className="border-bottom-1">
          <td className="bg-secondary">Town/City</td>
          <td>Seoul</td>
        </tr>
        <tr className="border-bottom-1">
          <td className="bg-secondary">Region</td>
          <td>South</td>
        </tr>
        <tr className="border-bottom-1">
          <td className="bg-secondary">VAT/TAXI ID</td>
          <td>-</td>
        </tr>
      </table>
      <div className="text-center mt-4">
        <CButton color="dark" variant="outline" className="me-2">
          Cancellation Approval
        </CButton>
        <CButton color="dark" variant="outline" className="me-5">
          Denial of Approval
        </CButton>
      </div>
    </div>
  );
};

export default OrderProductInfo;
