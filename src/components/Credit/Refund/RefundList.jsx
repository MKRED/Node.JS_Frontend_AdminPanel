import React, { useState, useContext, useEffect } from "react";
import { CButton } from "@coreui/react";
import styles from "../credit.module.css";
import stylesTable from "../../Member/Inquiry/member.module.css";
import { CFormSelect } from "@coreui/react";
import { AuthContext } from "../../../context/AuthContext";

const RefundList = () => {

  const auth = useContext(AuthContext)
  const [form, setForm] = useState()
  const [seeInfo, setSeeInfo] = useState(false)
  const [seeHistory, setSeeHistory] = useState(false)
  const [data, setData] = useState('')
  const [nowSeeData, setNowSeeData] = useState('')


  const changeHandler = event => { // считывает из формы
    if (event.target.name === 'status' && event.target.value === 'All')
      return setForm(form => ({ ...form, [event.target.name]: null }))
    setForm(form => ({ ...form, [event.target.name]: event.target.value }))
  }

  const checkboxHandler = (levelName) => {
    let tmp
    if (form.products) {
      tmp = form.products
      let index = tmp.findIndex(tmp => tmp === levelName)
      if (index === -1) tmp.push(levelName)
      else tmp.splice(index, 1)
    }
    else {
      return setForm({ ...form, products: [levelName] })
    }
    setForm({ ...form, products: tmp })
  }

  const resetHandler = () => {
    document.getElementById('resForm').reset()
    setForm({ id: auth.userId, jwt: auth.token })
  }

  useEffect(() => {
    if (auth && auth.token) {
      setForm(form => ({ ...form, id: auth.userId, jwt: auth.token }))
    }
  }, [setForm])

  const searchHandler = async () => { // вызывается кнопкой
    const responce = await fetch('http://localhost:80/admin/getTransactions', {
      method: 'POST', body: JSON.stringify(form), headers: { 'Content-Type': 'application/json' }
    })
    setData(await responce.json())
    console.log('Data', data, form);
  }

  const goToInfo = () => {
    setSeeInfo(false)
  }

  const goToList = event => {

    setNowSeeData(data.users[event.target.id])

    setSeeInfo(true)
  }

  return (
    <div className="container p-0">

      {
        seeInfo === false ?

          <div>
            <h5 className="ms-3 mt-3">
              Credit Charge Management - Purchase History List
            </h5>
            <hr />
            <div className="mt-4 ms-3 me-3">
              <h6 className="mb-3">Filter</h6>
              <form id="resForm">
                <div className="d-flex align-items-center">
                  <div className="me-3 d-flex">
                    <div className={styles.histDesc}>Name</div>
                    <input type="text" onChange={changeHandler} name="name" />
                  </div>
                  <div className="d-flex me-3">
                    <div className={styles.histDesc}>Date</div>
                    <input type="date" onChange={changeHandler} name="dateFrom" />
                    <span className="me-2 ms-2">~</span>
                    <input type="date" onChange={changeHandler} name="dateTo" />
                  </div>
                  <div className={styles.histDesc}>Product</div>
                  <div className={styles.checks}>
                    <input type="checkbox" className="me-1" onChange={() => checkboxHandler(0)} />
                    <span className="me-2">Standard</span>
                    <input type="checkbox" className="me-1" onChange={() => checkboxHandler(1)} />
                    <span className="me-2">Plus</span>
                    <input type="checkbox" className="me-1" onChange={() => checkboxHandler(2)} />
                    <span className="me-2">Premium</span>
                    <input type="checkbox" className="me-1" onChange={() => checkboxHandler(3)} />
                    <span>Gold</span>
                  </div>
                </div>
                <div className="me-3 mt-3 d-flex">
                  <div className={styles.histDesc}>Code</div>
                  <input type="text" onChange={changeHandler} name="code" />
                </div>
                <CFormSelect className="w-auto shadow-none mt-3" onChange={changeHandler} name="status">
                  <option>All</option>
                  <option>Waiting</option>
                  <option>Approval</option>
                </CFormSelect>
              </form>
              <div className="text-center">
                <CButton color="dark" className="me-3" onClick={searchHandler}>
                  Search
                </CButton>
                <CButton color="dark" onClick={resetHandler}>Reset</CButton>
              </div>
              <div className={styles.excel}>
                <div className="align-items-center d-flex justify-content-end">
                  <input type="checkbox" className="me-2" />
                  Apply current search filter
                </div>
                <CButton color="dark" variant="outline">
                  Excel File Download
                </CButton>
              </div>
              <table className={stylesTable.memberTable} border={1}>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Request Date</th>
                    <th>Name</th>
                    <th>Product</th>
                    <th>Charge</th>
                    <th>Paypal Amount</th>
                    <th>Deposited</th>
                    <th>Refund state</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.status === 'ok' && data.transactions.length !== 0 ?

                      data.transactions.map((datas, index) => {
                        return (
                          <tr>
                            <td id={index} onClick={goToInfo}>{datas.id}</td>
                            <td>{datas.created}</td>
                            <td>{datas.nick}</td>
                            <td>{datas.productName}</td>
                            <td>{datas.amount}</td>
                            <td>{datas.netAmount}</td>
                            <td>{datas.Payment}</td>
                            <td>
                              <CButton color="dark" variant="outline" className="p-0 pe-2 ps-2">
                                Approval
                              </CButton>
                            </td>
                          </tr>
                        )
                      })

                      :

                      <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          :

          <div>
            <h5 className="ms-3 mt-3">
              Credit Charge Management - Refund Management List - Detail
            </h5>
            <hr />
            <div className="mt-4">
              <div className={styles.detailDesc}>Holding Credit</div>
              <table className={styles.creditInfoTable} border={1}>
                <tr>
                  <td className={styles.key}>Name</td>
                  <td className={styles.value}>Ivan</td>
                </tr>
                <tr>
                  <td className={styles.key}>Product</td>
                  <td className={styles.value}>Standard</td>
                </tr>
                <tr>
                  <td className={styles.key}>Holding Credit</td>
                  <td className={styles.value}>50 Credit</td>
                </tr>
              </table>
              <div className={styles.detailDesc}>Refund Request</div>
              <table className={styles.creditInfoTable} border={1}>
                <tr>
                  <td className={styles.key}>Date</td>
                  <td className={styles.value}>2021.02.02</td>
                </tr>
                <tr>
                  <td className={styles.key}>Method of Payment</td>
                  <td className={styles.value}>Paypal</td>
                </tr>
                <tr>
                  <td className={styles.key}>Amount of Payment</td>
                  <td className={styles.value}>50$</td>
                </tr>
                <tr>
                  <td className={styles.key}>Reason for Refund</td>
                  <td className={styles.value}>simple refund</td>
                </tr>
              </table>
              <div className="text-center mt-5">
                <CButton
                  color="dark"
                  variant="outline"
                  className="pe-5 ps-5 me-3"
                  size="lg"
                  onClick={goToList}
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

export default RefundList;
