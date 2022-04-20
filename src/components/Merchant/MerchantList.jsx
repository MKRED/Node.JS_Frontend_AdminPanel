import React, { useState } from "react";

import styles from "./merchant.module.css";
import { CButton } from "@coreui/react";

const MerchantList = () => {

  const [form, setForm] = useState({
    status: 'All', search: '', levels: [false, false, false, false], merchant: true
  })
  const [merchantid, setMerchantid] = useState({
    code: 0
  })

  const changeHandler = event => {

    setForm(form => ({ ...form, [event.target.name]: event.target.value }))

  }

  const resetHandler = () => {
    document.getElementById('resForm').reset()
    setForm({status: 'All', search: '', levels: [false, false, false, false], merchant: true})
  }

  const checkboxHandler = (index) => {
    let tmp = form.levels
    tmp[index] = !tmp[index]
    setForm({ ...form, levels: tmp })
  }



  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Merchant Management - Merchant List</h5>
      <hr />
      <div className="ms-3 me-3">
        <form id="resForm">
          <div className="d-flex justify-content-center mt-5">
            <span className={styles.desc}>Search Term</span>
            <select onChange={changeHandler} name="status">
              <option>All</option>
              <option>Active</option>
              <option>Suspended</option>
              <option>Secession</option>
            </select>
            <input type="text" className="me-2 ms-2" onChange={changeHandler} name="search" />
            <span className={styles.desc}>Member Level</span>
            <div className={styles.checks}>
              <input type="checkbox" className="me-1" onChange={() => checkboxHandler(0)} />
              <span className="me-2">Beginner</span>
              <input type="checkbox" className="me-1" onChange={() => checkboxHandler(1)} />
              <span className="me-2">Advanced</span>
              <input type="checkbox" className="me-1" onChange={() => checkboxHandler(2)} />
              <span className="me-2">Expert</span>
              <input type="checkbox" className="me-1" onChange={() => checkboxHandler(3)} />
              <span>Master</span>
            </div>
          </div>
          <div className="text-center mt-5">
            <CButton color="dark" className="pe-3 ps-3 me-3">
              Search
            </CButton>
            <CButton color="dark" className="pe-3 ps-3 " onClick={resetHandler}>
              Reset
            </CButton>
          </div>
        </form>
        <>
          <div className={styles.excel}>
            <div>
              <span className={styles.total}>
                Total <b className="text-dark">2,560</b>
              </span>
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

          <table className={styles.table} border={1}>
            <thead>
              <tr>
                <th>Merchant</th>
                <th>Merchant Level</th>
                <th>Total Profit(%)</th>
                <th>Holding Profit</th>
                <th>Upload Pattern</th>
                <th>Downloads</th>
                <th>
                  <CButton color="light" variant="outline">
                    Suspend Uploader
                  </CButton>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>00001</td>
                <td>Expert</td>
                <td>1,230 USD (20%)</td>
                <td>700 USD</td>
                <td>1,230</td>
                <td>1,230</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>00001</td>
                <td>Expert</td>
                <td>1,230 USD (20%)</td>
                <td>700 USD</td>
                <td>1,230</td>
                <td>1,230</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
            </tbody>
          </table>
        </>
      </div>
    </div>
  );
};

export default MerchantList;
