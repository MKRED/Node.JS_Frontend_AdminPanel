import React from "react";
import { CButton } from "@coreui/react";
import styles from "../category.module.css";
import { NavLink } from "react-router-dom";

const setActive = (isActive) => (isActive ? styles.active_link : styles.link);

const years = [
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
];
const brands = [
  "Mercedes Benz",
  "BMW",
  "Ferrari",
  "Audi",
  "Bugatti",
  "KIA",
  "Rolls Royce",
  "LADA",
  "Tesla",
];
const models = [
  "Forte",
  "Forte 5",
  "K5",
  "Stinger",
  "Sportage",
  "Sedona",
  "Seltos",
  "Sorento",
  "Rio",
  "Ceed",
];
const subModels = ["GT", "GT-Line"];


const Vehicle = () => {



  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Pattern Management - Category</h5>
      <hr />
      <div className="ms-2 me-2 ">
        <div className="d-flex">
          <NavLink
            to="/pattern/category/vehicle/management"
            className={setActive}
          >
            Vehicle Management
          </NavLink>
          <NavLink
            to="/pattern/detailed/category/management"
            className={setActive}
          >
            Detailed Category Management
          </NavLink>
        </div>
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.title}>
              Region List
              <CButton
                color="light"
                variant="outline"
                size="sm"
                className="p-0 ms-2 pe-1 ps-1"
              >
                + add
              </CButton>
            </div>
            <div className="p-2">
              <div>
                <span>1</span>
                <CButton color="dark" variant="outline" className="p-0 ms-3">
                  Canada & USA
                </CButton>
                <hr />
              </div>
              <div>
                <span>2</span>
                <CButton color="dark" variant="outline" className="p-0 ms-3">
                  Europe
                </CButton>
                <hr />
              </div>
              <div>
                <span>3</span>
                <CButton color="dark" variant="outline" className="p-0 ms-3">
                  South Korea
                </CButton>
                <hr />
              </div>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.title}>
              Year List
              <CButton
                color="light"
                variant="outline"
                size="sm"
                className="p-0 ms-2 pe-1 ps-1"
              >
                + add
              </CButton>
            </div>
            {years.map((year) => {
              return (
                <div className="p-2">
                  <div>
                    <CButton
                      color="dark"
                      variant="outline"
                      className="p-0 ms-3 pe-1 ps-1"
                    >
                      {year}
                    </CButton>
                    <hr />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.container}>
            <div className={styles.title}>
              Brand List
              <CButton
                color="light"
                variant="outline"
                size="sm"
                className="p-0 ms-2 pe-1 ps-1"
              >
                + add
              </CButton>
            </div>
            {brands.map((brand, index) => {
              return (
                <div className="p-2">
                  <div>
                    <span>{index + 1}</span>
                    <CButton
                      color="dark"
                      variant="outline"
                      className="p-0 ms-3 pe-1 ps-1"
                    >
                      {brand}
                    </CButton>
                    <hr />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.container}>
            <div className={styles.title}>
              Model List
              <CButton
                color="light"
                variant="outline"
                size="sm"
                className="p-0 ms-2 pe-1 ps-1"
              >
                + add
              </CButton>
            </div>
            {models.map((model, index) => {
              return (
                <div className="p-2">
                  <div>
                    <span>{index + 1}</span>
                    <CButton
                      color="dark"
                      variant="outline"
                      className="p-0 ms-3 pe-1 ps-1"
                    >
                      {model}
                    </CButton>
                    <hr />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.container}>
            <div className={styles.title}>
              Sub Model List
              <CButton
                color="light"
                variant="outline"
                size="sm"
                className="p-0 ms-2 pe-1 ps-1"
              >
                + add
              </CButton>
            </div>
            {subModels.map((model, index) => {
              return (
                <div className="p-2">
                  <div>
                    <span>{index + 1}</span>
                    <CButton
                      color="dark"
                      variant="outline"
                      className="p-0 ms-3 pe-1 ps-1"
                    >
                      {model}
                    </CButton>
                    <hr />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.container}>
            <div className={styles.title}>
              Series List
              <CButton
                color="light"
                variant="outline"
                size="sm"
                className="p-0 ms-2 pe-1 ps-1"
              >
                + add
              </CButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicle;
