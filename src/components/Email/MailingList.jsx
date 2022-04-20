import React from "react";
import { CButton, CFormCheck, CFormInput } from "@coreui/react";
import styles from "./mail.module.css";

const MailingList = () => {
  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Automated Email Management</h5>
      <hr />
      <div className="ms-3 me-3">
        <div className="border">
          <div className="d-flex align-items-center ms-2 mt-3">
            <span className="me-3 ">Email Name</span>
            <CFormInput className="w-50" />
          </div>
          <div className={styles.text}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet
              animi consequuntur corporis culpa cum ea earum ipsa ipsam ipsum
              iusto laborum magnam nostrum quaerat quia repudiandae, ut
              voluptatem voluptates.
            </p>
            <p>00112233</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi
              blanditiis consectetur delectus doloribus esse inventore, ipsam
              iusto modi molestias nihil omnis, quisquam reiciendis rerum sint
              totam unde veniam voluptatem!
            </p>

            <div className="d-flex justify-content-between mt-5">
              <CButton color="dark" className="mt-5">
                Completed
              </CButton>

              <CButton color="dark" variant="outline" className="mt-5">
                x
              </CButton>
            </div>
          </div>
        </div>
        <table className="w-100 border mt-3">
          <thead>
            <tr className="text-center">
              <th className="p-1 border">Type</th>
              <th className="border">Detail Type</th>
              <th className="border">
                <CFormCheck />
              </th>
              <th className="border">Admin Email</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td rowSpan={3} className="border">
                User
              </td>
              <td className="border">Sign up</td>
              <td className="border">
                <CFormCheck />
              </td>
              <td className="border">inogrow@inogrow.com</td>
            </tr>
            <tr className="text-center">
              <td className="border">Dormant account</td>
              <td className="border">
                <CFormCheck />
              </td>
              <td className="border">inogrow@inogrow.com</td>
            </tr>
            <tr className="text-center">
              <td className="border">Stop account</td>
              <td className="border">
                <CFormCheck />
              </td>
              <td className="border">inogrow@inogrow.com</td>
            </tr>
            <tr className="text-center">
              <td className="border" rowSpan={3}>
                Order
              </td>
              <td className="border" rowSpan={3}>
                Sign up
              </td>
              <td className="border" rowSpan={3}>
                <CFormCheck />
              </td>
              <td className="border" rowSpan={3}>
                inogrow@inogrow.com
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MailingList;
