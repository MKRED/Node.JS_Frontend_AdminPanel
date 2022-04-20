import React, {useState} from "react";

import styles from "../credit.module.css";
import stylesTable from "../../Member/Inquiry/member.module.css";
import { CButton } from "@coreui/react";

const Gift = () => {

  const [form, setForm] = useState({
    status: 'All', search: '', levels: [false, false, false, false], merchant: false
  })
  const [gift, setGift] = useState({
    code: '', amount: 0
  })

  const changeHandler = event => { // считывает из формы

    setForm(form => ({ ...form, [event.target.name]: event.target.value }))

  }

  const checkboxHandler = (index) => {
    let tmp = form.levels
    tmp[index] = !tmp[index]
    setForm({ ...form, levels: tmp })
  }

  const resetHandler = () => {
    document.getElementById('resForm').reset()
    setForm({status: 'All', search: '', levels: [false, false, false, false], merchant: false})
  }

  const searchHandler = async () => { // вызывается кнопкой

    const responce = await fetch('http://localhost:80/admin/getUsersList', {
      method: 'POST', body: JSON.stringify(form), headers: { 'Content-Type': 'application/json' }
    })

    const data = await responce.json()

    console.log('Data', data, form);
  }

  const confirmGiftCredit = () => {
    let test = document.getElementById('inputGift').value || 0
    setGift(gift => ({...gift, amount: test}))
  }

  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">
        Credit Charge Management - Gift Credit Management
      </h5>
      <hr />
      <div className="ms-3 mt-3 me-3">
        <div className="mt-5">
          <h5>Gift credit amount setting</h5>
          <div className="align-items-center d-flex ms-5">
            <span className={styles.descDir}>Direct input</span>
            <input className={styles.inp} type="text" id="inputGift"/>
            <CButton color="dark" className="" onClick={confirmGiftCredit}>
              confirm
            </CButton>
          </div>
          <div className="text-center mt-2 me-5">
            * The gift credit is the credit is paid to the user in Boneus
          </div>
        </div>
        <form id="resForm">
          <h5>Member Search</h5>
          <div className="d-flex mt-4 ms-5">
            <span className={styles.title}>Search Term</span>
            <select onChange={changeHandler} name="status">
              <option>All</option>
              <option>Active</option>
              <option>Suspended</option>
              <option>Secession</option>
            </select>
            <input type="text" className="me-2 ms-2" onChange={changeHandler} name="search"/>
            <span className={styles.title}>Member Level</span>
            <div className={styles.checks}>
              <input type="checkbox" className="me-1" onChange={() => checkboxHandler(0)}/>
              <span className="me-2">Beginner</span>
              <input type="checkbox" className="me-1" onChange={() => checkboxHandler(1)}/>
              <span className="me-2">Advanced</span>
              <input type="checkbox" className="me-1" onChange={() => checkboxHandler(2)}/>
              <span className="me-2">Expert</span>
              <input type="checkbox" className="me-1" onChange={() => checkboxHandler(3)}/>
              <span>Master</span>
            </div>
          </div>
          <div className="text-center mt-5">
            <CButton color="dark" className="pe-3 ps-3 me-3" onClick={searchHandler}>
              Search
            </CButton>
            <CButton color="dark" className="pe-3 ps-3 " onClick={resetHandler}>
              Reset
            </CButton>
          </div>
        </form>
        <>
          <span className={stylesTable.total}>
            Total <b className="text-dark">5,380</b>
          </span>
          <table className={stylesTable.memberTable} border={1}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>Member Level</th>
                <th>Join Date</th>
                <th>
                  <CButton color="light" variant="outline">
                    Credit Gift
                  </CButton>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>00001</td>
                <td>ivan</td>
                <td>google@gmail.com</td>
                <td>010-xxxx-xxxx</td>
                <td>USA</td>
                <td>Master</td>
                <td>2021.01.01</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>00001</td>
                <td>ivan</td>
                <td>google@gmail.com</td>
                <td>010-xxxx-xxxx</td>
                <td>USA</td>
                <td>Master</td>
                <td>2021.01.01</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>00001</td>
                <td>ivan</td>
                <td>google@gmail.com</td>
                <td>010-xxxx-xxxx</td>
                <td>USA</td>
                <td>Master</td>
                <td>2021.01.01</td>
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

export default Gift;
