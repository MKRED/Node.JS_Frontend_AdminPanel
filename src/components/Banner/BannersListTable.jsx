import React from "react";
import { CButton, CFormCheck } from "@coreui/react";
import styles from "./banner.module.css";

const BannersListTable = () => {
  return (
    <table className="w-100 border mt-5">
      <thead>
        <tr className="text-center">
          <th className="p-2 border">
            <CFormCheck />
          </th>
          <th className="border">Code</th>
          <th className="border">Classification</th>
          <th className="border">Banner Name</th>
          <th className="border">Use</th>
          <th className="border">Preview</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-center border">
          <td className="border">
            <CFormCheck />
          </td>
          <td className="border">user banner</td>
          <td className="border"></td>
          <td className="border">main banner</td>
          <td className="border">
            <CButton color="dark" variant="outline" size="sm" className="me-2">
              x
            </CButton>
            <CButton color="dark" variant="outline" size="sm" className="p-1">
              ✓
            </CButton>
          </td>
          <td>
            <img src="" alt="" className={styles.img} />
          </td>
        </tr>
        <tr className="text-center border">
          <td className="border">
            <CFormCheck />
          </td>
          <td className="border">user banner</td>
          <td className="border"></td>
          <td className="border">main banner</td>
          <td className="border">
            <CButton color="dark" variant="outline" size="sm" className="me-2">
              x
            </CButton>
            <CButton color="dark" variant="outline" size="sm" className="p-1">
              ✓
            </CButton>
          </td>
          <td>
            <img src="" alt="" className={styles.img} />
          </td>
        </tr>
        <tr className="text-center border">
          <td className="border">
            <CFormCheck />
          </td>
          <td className="border">user banner</td>
          <td className="border"></td>
          <td className="border">main banner</td>
          <td className="border">
            <CButton color="dark" variant="outline" size="sm" className="me-2">
              x
            </CButton>
            <CButton color="dark" variant="outline" size="sm" className="p-1">
              ✓
            </CButton>
          </td>
          <td>
            <img src="#" alt="" className={styles.img} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BannersListTable;
