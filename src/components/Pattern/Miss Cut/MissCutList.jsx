import React, { useState } from "react";
import { CFormSelect } from "@coreui/react";
import styles from "../pattern.module.css";
import { CButton } from "@coreui/react";

const MissCutList = () => {
  const [form, setForm] = useState({
    status: '',
    region: '',
    make: '',
    year: '',
    model: '',
    submodel: '',
    series: '',
    nick: '',
    priceFrom: 0,
    priceTo: 0,
    earningSumFrom: 0,
    earningSumTo: 0,
    sizeFrom: 0,
    sizeTo: 0,
    dateFrom: '',
    dateTo: '',
    sponsor: false
  })

  const changeHandler = event => { // считывает из формы

    setForm(form => ({ ...form, [event.target.name]: event.target.value }))

  }

  const searchHandler = async () => { // вызывается кнопкой

    const responce = await fetch('http://localhost:80/admin/getPatternsList', {
      method: 'POST', body: JSON.stringify(form), headers: { 'Content-Type': 'application/json' }
    })

    const data = await responce.json()

    console.log('Data', data, form);
  }

  const resetHandler = () => {
    document.getElementById('resForm').reset()
    setForm({status: 'All', search: '', levels: [false, false, false, false], merchant: false})
  }

  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Pattern Management - Miss Cut</h5>
      <hr />
      <div className="ms-3 me-3">
        <form id="resForm">
          <div>
            <h5>Filter</h5>
            <p className="m-0">Pattern Information</p>
            <div className="d-flex mt-1">
              <div className={styles.desc}>Region</div>
              <input type="text" className="me-3" onChange={changeHandler} name="region"/>
              <div className={styles.desc}>Maker</div>
              <input type="text" className="me-3" onChange={changeHandler} name="make"/>
              <span className={styles.desc}>Year</span>
              <input type="text" className="me-3" onChange={changeHandler} name="year"/>
              <span className={styles.desc}>Model</span>
              <input type="text" onChange={changeHandler} name="model"/>
            </div>
            <div className="mt-3 d-flex">
              <div className={styles.desc}>Sub Model</div>
              <input type="text" className="me-3" onChange={changeHandler} name="submodel"/>
              <div className={styles.desc}>Series</div>
              <input type="text" className="me-3" onChange={changeHandler} name="series"/>
              <div className={styles.desc}>Code</div>
              <input type="text" onChange={changeHandler} name="code"/>
            </div>
          </div>
          <div className="mt-3">
            <p className="m-0">Upload Information</p>
            <div className="d-flex mt-1">
              <div className={styles.desc}>Uploader</div>
              <input type="text" className="me-3" onChange={changeHandler} name="nick"/>
              <div className={styles.desc}>Price</div>
              <input type="text" className={styles.shortInp} onChange={changeHandler} name="priceFrom"/>
              <div className="me-2 ms-2">-</div>
              <input type="text" className={styles.shortInp} onChange={changeHandler} name="priceTo"/>
              <div className={styles.desc}>Area</div>
              <input type="text" className={styles.shortInp} onChange={changeHandler} name="sizeFrom"/>
              <div className="me-2 ms-2">-</div>
              <input type="text" className={styles.shortInp} onChange={changeHandler} name="sizeTo"/>
            </div>
            <div className="mt-3 d-flex">
              <div className={styles.desc}>Date</div>
              <input type="date" onChange={changeHandler} name="dateFrom"/>
              <span className="me-2 ms-2">-</span>
              <input type="date" onChange={changeHandler} name="dateTo"/>
            </div>
            <div className="mb-3 text-center mt-4">
              <CButton color="dark" className="pe-3 ps-3 me-3" onClick={searchHandler}>
                Search
              </CButton>
              <CButton color="dark" className="pe-3 ps-3 " onClick={resetHandler}>
                Reset
              </CButton>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <span className="me-2">sort by</span>
            <CFormSelect color="dark" variant="outline" className="w-auto">
              <option value="">All</option>
              <option>Newest</option>
              <option>Oldest</option>
              <option>Waiting</option>
              <option>Reject</option>
            </CFormSelect>
          </div>
        </form>
        <table className={styles.table} border={1}>
          <thead>
            <tr>
              <th>Downloader</th>
              <th>Uploader</th>
              <th>Pattern Code</th>
              <th>Class</th>
              <th>Part</th>
              <th>Download Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>YOUA</td>
              <td>Kang</td>
              <td>ZCZX-1232-ASD5</td>
              <td>USA-BMW-2020-X Series- X5 Out Front</td>
              <td>Bumper(Bikini, Wrapped, Sensors)</td>
              <td>2021.09.13</td>
              <td>$1.0</td>
            </tr>
            <tr>
              <td>Aiara</td>
              <td>Kang</td>

              <td>ZCZX-1232-ASD5</td>
              <td>USA-BMW-2020-X Series- X5 Out Front</td>
              <td>Bumper(Bikini, Wrapped, Sensors)</td>
              <td>2021.09.13</td>
              <td>$1.0</td>
            </tr>
            <tr>
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
  );
};

export default MissCutList;
