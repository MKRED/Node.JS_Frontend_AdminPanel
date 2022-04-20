import React from "react";
import { CButton, CFormInput } from "@coreui/react";
import styles from "./product.module.css";

const products = [
  {
    image: "some",
    name: "ULTRAFIT XP CRYSTAL",
    code: "10365-10-562",
    inventory: "not enough inventory",
    category: "Pain protection film",
    price: 400,
  },
  {
    image: "some",
    name: "ULTRAFIT XP CRYSTAL",
    code: "10365-10-562",
    inventory: "not enough inventory",
    category: "Pain protection film",
    price: 400,
  },
  {
    image: "some",
    name: "ULTRAFIT XP CRYSTAL",
    code: "10365-10-562",
    inventory: "not enough inventory",
    category: "Pain protection film",
    price: 400,
  },
];

const UltrafitProductList = () => {
  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Product Management</h5>
      <hr />
      <div className="ms-3 me-3">
        <div className="d-flex">
          <CFormInput
            type="text"
            placeholder="Product name, Product no"
            className="w-50 me-2"
          />
          <CButton color="dark">Search</CButton>
        </div>
        <div className="text-end mb-3">
          <CButton color="dark">Add +</CButton>
        </div>
        <table className={styles.table}>
          <tr className="border-1">
            <th>Image</th>
            <th>Name</th>
            <th>Code</th>
            <th>Inventory Status</th>
            <th>Category</th>
            <th>Product Exposure</th>
            <th>Price</th>
          </tr>
          {products.map((item) => {
            return (
              <tr>
                <td>
                  <img src="#" alt="" className={styles.img} />
                </td>
                <td>{item.name}</td>
                <td>{item.code}</td>
                <td>{item.inventory}</td>
                <td>{item.category}</td>
                <td>
                  <input type="checkbox" />
                </td>
                <td>${item.price}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default UltrafitProductList;
