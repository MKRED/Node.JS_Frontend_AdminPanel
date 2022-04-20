import React, { useState, useContext, useEffect } from "react"
import { CButton } from "@coreui/react";
import styles from "../credit.module.css";
import stylesTable from "../../Member/Inquiry/member.module.css";
import { AuthContext } from "../../../context/AuthContext";

const PurchaseHistoryList = () => {

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

  const goToInfo = event => {
    setNowSeeData(data.transactions[event.target.id])

    setSeeInfo(true)
  }

  const goToList = () => {
    setForm({ id: auth.userId, jwt: auth.token })
    setSeeInfo(false)
  }

  const backToList = () => {
    setForm({ id: auth.userId, jwt: auth.token })
    backToInfo()
    setSeeInfo(false)

  }

  const goToHistory = () => {
    setSeeHistory(true)
  }

  const backToInfo = () => {
    setSeeHistory(false)
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
              <h6>Filter</h6>
              <form id="resForm">
                <div className="d-flex align-items-center" >
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
                    <input type="checkbox" className="me-1" onChange={() => checkboxHandler('standart')} />
                    <span className="me-2">Standard</span>
                    <input type="checkbox" className="me-1" onChange={() => checkboxHandler('plus')} />
                    <span className="me-2">Plus</span>
                    <input type="checkbox" className="me-1" onChange={() => checkboxHandler('premium')} />
                    <span className="me-2">Premium</span>
                    <input type="checkbox" className="me-1" onChange={() => checkboxHandler('gold')} />
                    <span>Gold</span>
                  </div>
                </div>
                <div className="me-3 mt-3 d-flex">
                  <div className={styles.histDesc}>Code</div>
                  <input type="text" onChange={changeHandler} name="code" />
                </div>
              </form>
              <div className="text-center mt-4">
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
                    <th>Date</th>
                    <th>Name</th>
                    <th>Product</th>
                    <th>Charge</th>
                    <th>Hoarding Credit</th>
                    <th>Payment</th>
                    <th>Deposited</th>
                    <th>Transaction ID</th>
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
                            <td>{datas.Deposited}</td>
                            <td>{datas.externalId}</td>
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
                        <td>-</td>
                      </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          :

          <div>

            {
              seeHistory === false ?

                <div>
                  <h5 className="ms-3 mt-3">
                    Credit Charge Management - Purchase History List - Detail
                  </h5>
                  <hr />
                  <div className="mt-4">
                    <div className={styles.detailDesc}>Charging Information</div>
                    <table className={styles.creditInfoTable} border={1}>
                      <tr>
                        <td className={styles.key}>Name</td>
                        <td className={styles.value}>{nowSeeData.nick}</td>
                      </tr>
                      <tr>
                        <td className={styles.key}>Date</td>
                        <td className={styles.value}>{nowSeeData.created}</td>
                      </tr>
                      <tr>
                        <td className={styles.key}>Product</td>
                        <td className={styles.value}>{nowSeeData.productName}</td>
                      </tr>
                      <tr>
                        <td className={styles.key}>Charging Credit</td>
                        <td className={styles.value}>{nowSeeData.Charging}</td>
                      </tr>
                      <tr>
                        <td className={styles.key}>Hoarding Credit</td>
                        <td className={styles.value}>{nowSeeData.Hoarding}</td>
                      </tr>
                    </table>
                    <div className={styles.detailDesc}>Payment Information</div>
                    <table className={styles.creditInfoTable} border={1}>
                      <tr>
                        <td className={styles.key}>Method of Payment</td>
                        <td className={styles.value}>PayPal</td>
                      </tr>
                      <tr>
                        <td className={styles.key}>Amount of Payment</td>
                        <td className={styles.value}>{nowSeeData.amount}</td>
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
                      <CButton color="dark" variant="outline" size="lg" onClick={goToHistory}>
                        Credit History
                      </CButton>
                    </div>
                  </div>
                </div>

                :

                <div>
                  <h5 className="ms-3 mt-3">
                    Credit Charge Management - Purchase History List - Credit History
                  </h5>
                  <hr />
                  <div className="ms-3 mt-4 me-3">
                    <div className={styles.detailDesc}>Credit History</div>
                    <table className={styles.table} border={1}>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Purchase History</th>
                          <th>Product Code</th>
                          <th>Currency</th>
                          <th>Deposit</th>
                          <th>Withdraw</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data.transactions.credit !== undefined && data.transactions.credit.length !== 0 ?

                            data.transactions.map((datas, index) => {
                              return (
                                <tr>
                                  <td id={index}>{datas.id}</td>
                                  <td>{datas.created}</td>
                                  <td>{datas.nick}</td>
                                  <td>{datas.productName}</td>
                                  <td>{datas.amount}</td>
                                  <td>{datas.netAmount}</td>
                                  <td>{datas.Payment}</td>
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
                            </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center mt-3">
                    <CButton
                      color="dark"
                      variant="outline"
                      size="lg"
                      className="me-4 pe-5 ps-5"
                      onClick={backToList}
                    >
                      List
                    </CButton>
                    <CButton color="dark" variant="outline" size="lg" onClick={backToInfo}>
                      Charging Information
                    </CButton>
                  </div>
                </div>

            }

          </div>

      }


    </div>
  );
};

export default PurchaseHistoryList;
