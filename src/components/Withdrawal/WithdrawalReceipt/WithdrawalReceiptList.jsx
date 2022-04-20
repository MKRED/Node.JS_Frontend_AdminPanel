import React, { useState } from "react";

import styles from "../withdrawal.module.css";
import { CButton } from "@coreui/react";

const WithdrawalReceiptList = () => {
  const [form, setForm] = useState({
    code: '', name: '', dateFrom: '', dateTo: '', description: '', status: '', levels: [false, false, false, false]
  })
  const [Auth, setAuth] = useState({code: 0})
  const [seeDetail, setSeeDetail] = useState(false)

  const resetHandler = () => {
    document.getElementById('resForm').reset()
    setForm({ code: '', name: '', dateFrom: '', dateTo: '', description: '', status: '', levels: [false, false, false, false] })
  }

  const changeHandler = event => { // считывает из формы

    setForm(form => ({ ...form, [event.target.name]: event.target.value }))

  }

  const searchHandler = async () => { // вызывается кнопкой

    const responce = await fetch('http://localhost:80/admin/getTransactions', {
      method: 'POST', body: JSON.stringify(form), headers: { 'Content-Type': 'application/json' }
    })

    const data = await responce.json()

    console.log('Data', data, form);
  }

  const approvePayOut = async () => { // вызывается кнопкой

    const responce = await fetch('http://localhost:80/admin/approvePayOut', {
      method: 'POST', body: JSON.stringify(Auth), headers: { 'Content-Type': 'application/json' }
    })

    const data = await responce.json()

    console.log('Data', data, Auth);
  }

  const cancelPayOut = async () => { // вызывается кнопкой

    const responce = await fetch('http://localhost:80/admin/cancelPayOut', {
      method: 'POST', body: JSON.stringify(Auth), headers: { 'Content-Type': 'application/json' }
    })

    const data = await responce.json()

    console.log('Data', data, Auth);
  }

  const setCode = () => {
    setAuth()
  }

  const goToDetail = () => {
    setSeeDetail(true)
  }

  const backToDetail = () => {
    setSeeDetail(false)
  }


  return (
    <div className="container p-0">

      {
        seeDetail === false ?

          <div>
            <h5 className="ms-3 mt-3">
              Withdrawal Management - Withdrawal Receipt List
            </h5>
            <hr />
            <div className="ms-3 me-3">
              <form id="resForm">
                <div>
                  <h5>Filter</h5>
                  <div className="d-flex mt-4">
                    <span className={styles.desc}>Name</span>
                    <input type="text" className="me-3" onChange={changeHandler} name="name" />
                    <div className="d-flex me-3">
                      <div className={styles.desc}>Date</div>
                      <input type="date" onChange={changeHandler} name="dateFrom" />
                      <span className="me-2 ms-2">~</span>
                      <input type="date" className="me-4" onChange={changeHandler} name="dateTo" />
                    </div>
                    <span className={styles.desc}>Paypal Email</span>
                    <input type="text" onChange={changeHandler} name="paypalEmail" />
                  </div>
                </div>
                <div className={styles.excel}>
                  <div>
                    <span className="me-2">sort by</span>
                    <CButton color="dark" variant="outline">
                      Newest
                    </CButton>
                  </div>
                  <div className="mb-3">
                    <CButton color="dark" className="pe-3 ps-3 me-3" onClick={searchHandler}>
                      Search
                    </CButton>
                    <CButton color="dark" className="pe-3 ps-3 " onClick={resetHandler}>
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
                    <div className="mt-3">
                      <CButton color="dark" variant="outline" className="me-3 pe-3 ps-3" onClick={approvePayOut}>
                        Approval
                      </CButton>
                      <CButton color="danger" className="text-white pe-3 ps-3" onClick={cancelPayOut}>
                        Cancel
                      </CButton>
                    </div>
                  </div>
                </div>
              </form>
              <table className={styles.table} border={1}>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Withdrawal Amount</th>
                    <th>Transaction Fee</th>
                    <th>Paypal E-mail</th>
                    <th>
                      <input type="checkbox" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td onClick={goToDetail}>00001</td>
                    <td>Ivan</td>
                    <td>2021.21.21</td>
                    <td>1250$</td>
                    <td>1$</td>
                    <td>google@gmail.com</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <td>00001</td>
                    <td>Ivan</td>
                    <td>2021.21.21</td>
                    <td>700$</td>
                    <td>2$</td>
                    <td>never@never.com</td>
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
            </div>
          </div>

          :

          <div>
            <h5 className="ms-3 mt-3">
              Withdrawal Management - Withdrawal Receipt List - View Details
            </h5>
            <hr />
            <div className="mt-5">
              <div className={styles.detailDesc}>Withdrawal Request Information </div>
              <table className={styles.creditInfoTable} border={1}>
                <tr>
                  <td className={styles.key}>Name</td>
                  <td className={styles.value}>Ivan</td>
                </tr>
                <tr>
                  <td className={styles.key}>Date</td>
                  <td className={styles.value}>2021.01.01 07:35AM(KR)</td>
                </tr>
                <tr>
                  <td className={styles.key}>Holding Profit</td>
                  <td className={styles.value}>$ 45,000</td>
                </tr>
                <tr>
                  <td className={styles.key}>Withdrawal Amount</td>
                  <td className={styles.value}>$ 20,000</td>
                </tr>
                <tr>
                  <td className={styles.key}>Means of Request</td>
                  <td className={styles.value}>Paypal</td>
                </tr>
                <tr>
                  <td className={styles.key}>Paypal Email</td>
                  <td className={styles.value}>never@never.com</td>
                </tr>
                <tr>
                  <td className={styles.key}>Total Withdrawal</td>
                  <td className={styles.value}>$ 5,000</td>
                </tr>
              </table>
              <div className="text-center mt-5">
                <CButton
                  color="danger"
                  className="pe-5 ps-5 me-4 text-white"
                  size="lg"
                >
                  Cancel
                </CButton>
                <CButton
                  color="dark"
                  variant="outline"
                  className="pe-5 ps-5 me-4"
                  size="lg"
                >
                  Approval
                </CButton>
                <CButton
                  color="dark"
                  variant="outline"
                  className="pe-5 ps-5"
                  size="lg"
                  onClick={backToDetail}
                >
                  List
                </CButton>
              </div>
            </div>
          </div>
      }

    </div>
  );
};

export default WithdrawalReceiptList;
