import React from "react";
import { CButton, CFormInput } from "@coreui/react";

const AdminModal = () => {
  return (
    <div className="w-75 m-auto border">
      <div className="bg-secondary p-2 fs-5 m-1">
        Lorem ipsum dolor sit amet
      </div>
      <div className="m-4">
        <table>
          <tbody>
            <tr>
              <td className="p-2">ID:</td>
              <td className="p-2">
                <CFormInput />
              </td>
            </tr>
            <tr>
              <td className="p-2">PWD:</td>
              <td className="p-2">
                <CFormInput />
              </td>
            </tr>
            <tr>
              <td className="p-2">PWD Confirm:</td>
              <td className="p-2">
                <CFormInput />
              </td>
            </tr>
          </tbody>
        </table>
        <hr className="w-75 m-auto mt-4 mb-4 " />
        <div className="text-center">
          <CButton color="dark" className="me-3 pe-4 ps-4">
            SAVE
          </CButton>
          <CButton color="dark">CANCEL</CButton>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
