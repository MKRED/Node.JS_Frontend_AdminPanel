import React, {useState} from "react";
import OrderCancellationDetail from "./OrderCancellationDetail";

const CancellationList = () => {

  const [info, setInfo] =useState(false)

  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Order Cancellation</h5>
      <hr />
      <div className="ms-3 me-3">
        {info && <OrderCancellationDetail />}
        <div className="border rounded p-2">Order Cancellation</div>
        <table className="w-100">
          <tr className="text-center border-bottom-1" >
            <th className="p-2">Code</th>
            <th>Product Name</th>
            <th>Purchase Option</th>
            <th>Date</th>
            <th>Cancellation Date</th>
            <th>Purchase Cost</th>
            <th>State</th>
          </tr>
          <tr className="text-center border-bottom-1" onClick={()=> setInfo(!info)}>
            <td className="p-2">000001</td>
            <td>ULTRAFIT XP CRYSTAL </td>
            <td>1 EA</td>
            <td>2012.12.12</td>
            <td>2012.12.13</td>
            <td>$1200</td>
            <td>Cancellation Approval</td>
          </tr>
          <tr className="text-center border-bottom-1">
            <td className="p-2">000002</td>
            <td>ULTRAFIT XP CRYSTAL </td>
            <td>3 EA</td>
            <td>2012.12.12</td>
            <td>2012.12.13</td>
            <td>$400</td>
            <td>Cancellation Approval</td>
          </tr>
          <tr className="text-center border-bottom-1">
            <td className="p-2">000003</td>
            <td>ULTRAFIT XP CRYSTAL </td>
            <td>1 EA</td>
            <td>2012.12.12</td>
            <td>2012.12.13</td>
            <td>$800</td>
            <td>Waiting</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default CancellationList;
