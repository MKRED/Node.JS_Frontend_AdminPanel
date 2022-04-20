import React from "react";
import styles from "./sponsor.module.css";
import { CButton, CFormSelect } from "@coreui/react";
import SponsorAdListTitleMember from "./SponsorADListTitleMember";
import SponsorAdListTitlePattern from "./SponsorADListTitlePattern";

const SponsorAdListTitle = () => {
  return (
    <>
      <div>
        <h5>Filter</h5>
        <SponsorAdListTitleMember />
        <SponsorAdListTitlePattern />
      </div>
      <div className={styles.excel}>
        <div className="d-flex align-items-center">
          <div className="me-2">sort </div>
          <CFormSelect
            color="dark"
            variant="outline"
            size="ms"
            className="p-0 ps-1 pe-1"
          >
            <option>All</option>
            <option>Newest</option>
            <option>Oldest</option>
            <option>Some</option>
          </CFormSelect>
        </div>
        <div className="mb-3">
          <CButton color="dark" className="pe-3 ps-3 me-3">
            Search
          </CButton>
          <CButton color="dark" className="pe-3 ps-3 ">
            Reset
          </CButton>
        </div>
        <div>
          <div>
            <input type="checkbox" className="me-2" />
            <span>Apply current search filter</span>
          </div>
          <div>
            <CButton color="dark" variant="outline">
              Excel File Download
            </CButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsorAdListTitle;
