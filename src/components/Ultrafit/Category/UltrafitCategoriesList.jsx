import React from "react";
import styles from "./category.module.css";
import { CButton } from "@coreui/react";

const categories = [
  "Windshield Protection",
  "Paint Protection Film",
  "Window Film",
];

const UltrafitCategoriesList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        1 Dept
        <CButton
          color="light"
          variant="outline"
          size="sm"
          className="p-0 ms-4 pe-1 ps-1"
        >
          + add
        </CButton>
      </div>
      {categories.map((category, index) => {
        return (
          <div className="p-2">
            <span>{index + 1}</span>
            <CButton
              color="dark"
              variant="outline"
              className="p-0 ms-3 pe-1 ps-1"
            >
              {category}
            </CButton>
            <hr />
          </div>
        );
      })}
      <div className={styles.btn}>
        <CButton color="dark" variant="outline" className="p-0 ps-1 pe-1">
          Completed
        </CButton>
      </div>
    </div>
  );
};

export default UltrafitCategoriesList;
