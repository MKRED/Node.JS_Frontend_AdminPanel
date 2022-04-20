import React from "react";
import { CButton, CFormSelect } from "@coreui/react";

const AutomatedEmail = () => {
  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Automated Email Management</h5>
      <hr />
      <div className="ms-3 me-3">
        <div className="d-flex justify-content-between">
          <h5>Email in use: inogrow@inogrow.ru</h5>
          <CButton color="dark">Create New Mail</CButton>
        </div>
        <table className="w-100 mt-5">
          <thead>
            <tr className="text-center">
              <th>Email Name</th>
              <th>Contents</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-bottom-1 text-center">
              <td className="p-3">google@google.com</td>
              <td>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
                cum doloribus eum nihil quas.
              </td>
              <td>
                <CFormSelect>
                  <option>Automatic</option>
                </CFormSelect>
              </td>
              <td>
                <CButton color="dark" variant="outline" className="ms-5">
                  Edit
                </CButton>
              </td>
            </tr>
            <tr className="border-bottom-1 text-center">
              <td className="p-3">google@google.com</td>
              <td>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
                cum doloribus eum nihil quas.
              </td>
              <td>
                <CFormSelect>
                  <option>Automatic</option>
                </CFormSelect>
              </td>
              <td>
                <CButton color="dark" variant="outline" className="ms-5">
                  Edit
                </CButton>
              </td>
            </tr>
            <tr className="border-bottom-1 text-center">
              <td className="p-3">google@google.com</td>
              <td>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
                cum doloribus eum nihil quas.
              </td>
              <td>
                <CFormSelect>
                  <option>Automatic</option>
                </CFormSelect>
              </td>
              <td>
                <CButton color="dark" variant="outline" className="ms-5">
                  Edit
                </CButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AutomatedEmail;
