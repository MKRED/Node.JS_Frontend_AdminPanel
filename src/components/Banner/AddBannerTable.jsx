import React from "react";
import styles from "./banner.module.css";
import { CFormCheck, CFormInput, CFormSelect } from "@coreui/react";

const AddBannerTable = () => {
  return (
    <table className={styles.table}>
      <tbody className={styles.body}>
        <tr>
          <td className=" w-25">Banner Name</td>
          <td>
            <CFormInput className="w-75" />
          </td>
        </tr>
        <tr>
          <td>Banner Classification</td>
          <td>
            <div className="d-flex">
              <CFormSelect className="w-auto">
                <option>some</option>
              </CFormSelect>
              <CFormSelect className="w-auto">
                <option>some</option>
              </CFormSelect>
              <CFormSelect className="w-auto">
                <option>some</option>
              </CFormSelect>
              <CFormSelect className="w-auto">
                <option>some</option>
              </CFormSelect>
            </div>
          </td>
        </tr>
        <tr>
          <td>Period</td>
          <td>
            <div className="text-start">
              <CFormCheck />
              <span className="ms-2">check</span>
            </div>
            <div className="text-start mt-1">
              <input type="date" className="me-2" />
              <input type="time" />
              <span className="me-2 ms-2">~</span>
              <input type="date" className="me-2" />
              <input type="time" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Whether or not to use</td>
          <td className="text-start">
            <CFormCheck />
            <span className="me-4 ms-2">some</span>
            <CFormCheck />
            <span className="ms-2">some</span>
          </td>
        </tr>
        <tr>
          <td>Link</td>
          <td>
            <div className="d-flex">
              <CFormSelect className="w-auto me-3">
                <option>some</option>
              </CFormSelect>
              <CFormInput className="w-75" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Link target</td>
          <td>
            <CFormSelect className="w-auto me-3">
              <option>some</option>
            </CFormSelect>
          </td>
        </tr>
        <tr>
          <td>배너 타입</td>
          <td>
            <CFormSelect className="w-auto me-3">
              <option>some</option>
            </CFormSelect>
          </td>
        </tr>
        <tr className={styles.some}>
          <td>파일 업로드</td>
          <td className="text-start">
            <div className="d-flex align-items-center">
              <span className="me-2">something:</span>
              <CFormInput className="w-auto me-5" />
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AddBannerTable;
