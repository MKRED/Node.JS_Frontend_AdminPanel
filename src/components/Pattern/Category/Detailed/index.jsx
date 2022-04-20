import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../category.module.css";
import { CButton } from "@coreui/react";

const setActive = (isActive) => (isActive ? styles.active_link : styles.link);

const sections = ["All", "Out Front", "Outside", "Out Rear", "Inner"];
const patterns = ["Bumper", "Front Fender", "Head Light", "Hood"];
const subPart = ["Bikini", "Wrapped", "Sensors", "Classic"];

const Detailed = () => {
  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Pattern Management - Category</h5>
      <hr />
      <div className="ms-2">
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
              Part Section
              <CButton
                color="light"
                variant="outline"
                size="sm"
                className="p-0 ms-4 pe-1 ps-1"
              >
                + add
              </CButton>
            </div>
            {sections.map((section, index) => {
              return (
                <div className="p-2">
                  <div>
                    <span>{index + 1}</span>
                    <CButton
                      color="dark"
                      variant="outline"
                      className="p-0 ms-3 pe-1 ps-1"
                    >
                      {section}
                    </CButton>
                    <hr />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.container}>
            <div className={styles.title}>
              Pattern Part
              <CButton
                color="light"
                variant="outline"
                size="sm"
                className="p-0 ms-4 pe-1 ps-1"
              >
                + add
              </CButton>
            </div>
            {patterns.map((pattern, index) => {
              return (
                <div className="p-2">
                  <div>
                    <span>{index + 1}</span>
                    <CButton
                      color="dark"
                      variant="outline"
                      className="p-0 ms-3 pe-1 ps-1"
                    >
                      {pattern}
                    </CButton>
                    <hr />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.container}>
            <div className={styles.title}>
              Sub Part
              <CButton
                color="light"
                variant="outline"
                size="sm"
                className="p-0 ms-4 pe-1 ps-1"
              >
                + add
              </CButton>
            </div>
            {subPart.map((sub, index) => {
              return (
                <div className="p-2">
                  <div>
                    <span>{index + 1}</span>
                    <CButton
                      color="dark"
                      variant="outline"
                      className="p-0 ms-3 pe-1 ps-1"
                    >
                      {sub}
                    </CButton>
                    <hr />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailed;
