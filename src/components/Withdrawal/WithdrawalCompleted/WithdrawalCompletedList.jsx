import React, {useState} from "react";
import styles from "../withdrawal.module.css";
import { CButton } from "@coreui/react";

const WithdrawalCompletedList = () => {
  const [form, setForm] = useState({
    code: '', name: '', dateFrom: '', dateTo: '', description: '', status: '', levels: [false, false, false, false]
  })
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
              Withdrawal Management - Withdrawal Completed List
            </h5>
            <hr />
            <div className="ms-3 me-3">
              <form id="resForm">
                <div>
                  <h5>Filter</h5>
                  <div className="d-flex mt-4">
                    <span className={styles.desc}>Name</span>
                    <input type="text" className="me-3" onChange={changeHandler} name="name"/>
                    <div className="d-flex me-3">
                      <div className={styles.desc}>Date</div>
                      <input type="date" onChange={changeHandler} name="dateFrom"/>
                      <span className="me-2 ms-2">~</span>
                      <input type="date" className="me-4" onChange={changeHandler} name="dateTo"/>
                    </div>
                    <span className={styles.desc}>Amount</span>
                    <input type="text" className={styles.shortInp} onChange={changeHandler} name="amountFrom"/>
                    <span className="me-2 ms-2">-</span>
                    <input type="text" className={styles.shortInp} onChange={changeHandler} name="amountTo"/>
                  </div>
                  <div className="mt-3 d-flex">
                    <div className={styles.desc}>Paypal Email</div>
                    <input type="text" className="me-3" onChange={changeHandler} name="paypalEmail"/>
                    <div className={styles.desc}>Code</div>
                    <input type="text" onChange={changeHandler} name="code"/>
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
                  </div>
                </div>
              </form>
              <table className={styles.table} border={1}>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Transaction Fee</th>
                    <th>Paypal E-mail</th>
                    <th>Transaction ID</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td onClick={goToDetail}>00001</td>
                    <td>Ivan(Aiara)</td>
                    <td>2021.21.21</td>
                    <td>1250$</td>
                    <td>1$</td>
                    <td>google@gmail.com</td>
                    <td>11W90245RA651891H</td>
                  </tr>
                  <tr>
                    <td>00001</td>
                    <td>Ivan(Apple)</td>
                    <td>2021.21.21</td>
                    <td>700$</td>
                    <td>2$</td>
                    <td>never@never.com</td>
                    <td>11W90245RA651891H</td>
                  </tr>
                  <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          :

          <div>
            <h5 className="ms-3 mt-3">
              Withdrawal Management - Withdrawal Completed List - View Details
            </h5>
            <hr />
            <div className="mt-5">
              <div className={styles.detailDesc}>Completion Information </div>
              <table className={styles.creditInfoTable} border={1}>
                <tr>
                  <td className={styles.key}>Name</td>
                  <td className={styles.value}>Ivan</td>
                </tr>
                <tr>
                  <td className={styles.key}>Request Date</td>
                  <td className={styles.value}>2021.01.01 07:35AM(KR)</td>
                </tr>
                <tr>
                  <td className={styles.key}> Profit Balance</td>
                  <td className={styles.value}>$ 20,000</td>
                </tr>
                <tr>
                  <td className={styles.key}>Withdrawal Amount</td>
                  <td className={styles.value}>$ 25,000</td>
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
                  <td className={styles.value}>$ 25,000</td>
                </tr>
              </table>
              <div className="text-center mt-5">
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

export default WithdrawalCompletedList;
