import React from "react";
import UltrafitCategoriesList from "./UltrafitCategoriesList";

const Category = () => {
  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Category</h5>
      <hr />
      <div className="d-flex ms-3 mt-5">
        <UltrafitCategoriesList />
        <UltrafitCategoriesList />
        <UltrafitCategoriesList />
      </div>
    </div>
  );
};

export default Category;
