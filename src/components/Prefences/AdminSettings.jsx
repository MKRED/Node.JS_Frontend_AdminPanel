import React, { useState } from "react";
import { CButton } from "@coreui/react";
import styles from "./preferences.module.css";

const AdminSettings = () => {
  const [add, setAdd] = useState(false);

  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Preferences - Admin Settings</h5>
      <hr />
      <div className="w-50 m-auto mt-5">
        <div className="text-end">
          <CButton color="dark" variant="outline" onClick={() => setAdd(!add)}>
            + Add
          </CButton>
        </div>
        <div className={styles.scroll}>
          <table className={styles.table}>
            <thead>
              <tr className="text-center bg-dark text-white">
                <th className="p-3">No</th>
                <th>Authority</th>
                <th>ID</th>
                <th>Last Access Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center border-bottom-1">
                <td className="p-3">1</td>
                <td>Super</td>
                <td>SuperAdmin</td>
                <td>2012.12.12</td>
                <td>
                  <CButton
                    color="dark"
                    variant="outline"
                    className="p-0 pe-1 ps-1"
                  >
                    Delete
                  </CButton>
                </td>
              </tr>
              <tr className="text-center border-bottom-1">
                <td className="p-3">2</td>
                <td>Admin</td>
                <td>NormalAdmin</td>
                <td>2012.12.12</td>
                <td>
                  <CButton
                    color="dark"
                    variant="outline"
                    className="p-0 pe-1 ps-1 me-2"
                  >
                    Edit
                  </CButton>
                  <CButton
                    color="dark"
                    variant="outline"
                    className="p-0 pe-1 ps-1"
                  >
                    Delete
                  </CButton>
                </td>
              </tr>
              <tr className="text-center border-bottom-1">
                <td className="p-3">3</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <CButton
                    color="dark"
                    variant="outline"
                    className="p-0 pe-1 ps-1 me-2"
                  >
                    Edit
                  </CButton>
                  <CButton
                    color="dark"
                    variant="outline"
                    className="p-0 pe-1 ps-1"
                  >
                    Delete
                  </CButton>
                </td>
              </tr>
              <tr className="text-center border-bottom-1">
                <td className="p-3">4</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <CButton
                    color="dark"
                    variant="outline"
                    className="p-0 pe-1 ps-1 me-2"
                  >
                    Edit
                  </CButton>
                  <CButton
                    color="dark"
                    variant="outline"
                    className="p-0 pe-1 ps-1"
                  >
                    Delete
                  </CButton>
                </td>
              </tr>
              <tr className="text-center border-bottom-1">
                <td className="p-3">5</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <CButton
                    color="dark"
                    variant="outline"
                    className="p-0 pe-1 ps-1 me-2"
                  >
                    Edit
                  </CButton>
                  <CButton
                    color="dark"
                    variant="outline"
                    className="p-0 pe-1 ps-1"
                  >
                    Delete
                  </CButton>
                </td>
              </tr>
              <tr className="text-center border-bottom-1">
                <td className="p-3">6</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <CButton
                    color="dark"
                    variant="outline"
                    className="p-0 pe-1 ps-1 me-2"
                  >
                    Edit
                  </CButton>
                  <CButton
                    color="dark"
                    variant="outline"
                    className="p-0 pe-1 ps-1"
                  >
                    Delete
                  </CButton>
                </td>
              </tr>
              <tr className="text-center border-bottom-1">
                <td className="p-3">7</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <CButton
                    color="dark"
                    variant="outline"
                    className="p-0 pe-1 ps-1 me-2"
                  >
                    Edit
                  </CButton>
                  <CButton
                    color="dark"
                    variant="outline"
                    className="p-0 pe-1 ps-1"
                  >
                    Delete
                  </CButton>
                </td>
              </tr>
              <tr className="text-center border-bottom-1">
                <td className="p-3">8</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <CButton
                    color="dark"
                    variant="outline"
                    className="p-0 pe-1 ps-1 me-2"
                  >
                    Edit
                  </CButton>
                  <CButton
                    color="dark"
                    variant="outline"
                    className="p-0 pe-1 ps-1"
                  >
                    Delete
                  </CButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
