import React, { useState } from "react";
import { CFormSelect } from "@coreui/react";
import { CButton } from "@coreui/react";
import styles from "../pattern.module.css";

const PatternList = () => {
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
  const [seeDetails, setSeeDetails] = useState(false)

  const resetHandler = () => {
    document.getElementById('resForm').reset()
    setForm({
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
  }

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

  const goToDetail = () => {
    setSeeDetails(true)
  }

  const goToList = () => {
    setSeeDetails(false)
  }


  return (
    <div className="container p-0">

      {
        seeDetails === false ?

          <div>
            <h5 className="ms-3 mt-3">Pattern Management - Pattern List</h5>
            <hr />
            <div className="ms-3 me-3">
              <form id="resForm">
                <>
                  <h5>Filter</h5>
                  <p className="m-0">Pattern Information</p>
                  <div className="d-flex mt-1">
                    <div className={styles.desc}>Region</div>
                    <input type="text" className="me-3" onChange={changeHandler} name="region" />
                    <div className={styles.desc}>Maker</div>
                    <input type="text" className="me-3" onChange={changeHandler} name="make" />
                    <span className={styles.desc}>Year</span>
                    <input type="text" className="me-3" onChange={changeHandler} name="year" />
                    <span className={styles.desc}>Model</span>
                    <input type="text" onChange={changeHandler} name="model" />
                  </div>
                  <div className="mt-3 d-flex">
                    <div className={styles.desc}>Sub Model</div>
                    <input type="text" className="me-3" onChange={changeHandler} name="submodel" />
                    <div className={styles.desc}>Series</div>
                    <input type="text" onChange={changeHandler} name="series" />
                  </div>
                </>
                <div className="mt-3">
                  <p className="m-0">Upload Information</p>
                  <div className="d-flex mt-1">
                    <div className="d-flex">
                      <div className={styles.desc}>Uploader</div>
                      <input type="text" className="me-3" onChange={changeHandler} name="nick" />
                    </div>
                    <div className="d-flex me-3">
                      <div className={styles.desc}>Price</div>
                      <input type="text" className={styles.shortInp} onChange={changeHandler} name="priceFrom" />
                      <div className="me-2 ms-2">-</div>
                      <input type="text" className={styles.shortInp} onChange={changeHandler} name="priceTo" />
                    </div>
                    <div className="d-flex me-3">
                      <div className={styles.desc}>Area</div>
                      <input type="text" className={styles.shortInp} onChange={changeHandler} name="sizeFrom" />
                      <div className="me-2 ms-2">-</div>
                      <input type="text" className={styles.shortInp} onChange={changeHandler} name="sizeTo" />
                    </div>
                    <div className="d-flex">
                      <div className={styles.desc}>Usage Fee</div>
                      <input type="text" className={styles.shortInp} onChange={changeHandler} name="usageFeeFrom" />
                      <div className="me-2 ms-2">-</div>
                      <input type="text" className={styles.shortInp} onChange={changeHandler} name="usageFeeTo" />
                    </div>
                  </div>
                  <div className="mt-3 d-flex ">
                    <div className="d-flex me-3">
                      <div className={styles.desc}>Date</div>
                      <input type="date" onChange={changeHandler} name="dateFrom" />
                      <span className="me-2 ms-2">-</span>
                      <input type="date" onChange={changeHandler} name="dateTo" />
                    </div>
                    <div className="d-flex me-3">
                      <div className={styles.desc}>Earning Fee</div>
                      <input type="text" className={styles.shortInp} onChange={changeHandler} name="earningFeeFrom" />
                      <div className="me-2 ms-2">-</div>
                      <input type="text" className={styles.shortInp} onChange={changeHandler} name="earningFeeTo" />
                    </div>
                    <div className="d-flex">
                      <div className={styles.desc}>Downloads</div>
                      <input type="text" className={styles.shortInp} onChange={changeHandler} name="downloadsFrom" />
                      <div className="me-2 ms-2">-</div>
                      <input type="text" className={styles.shortInp} onChange={changeHandler} name="downloadsTo" />
                    </div>
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
                    <option>Date of Registration</option>
                    <option>High sales rate</option>
                    <option>High rating</option>
                    <option>Comment</option>
                    <option>Stop selling</option>
                  </CFormSelect>
                </div>
              </form>
              <table className={styles.table} border={1}>
                <thead>
                  <tr>
                    <th>Uploader</th>
                    <th>Pattern Code</th>
                    <th>Class</th>
                    <th>Part</th>
                    <th>Upload Date</th>
                    <th>Price</th>
                    <th>Area</th>
                    <th>Downloads</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td onClick={goToDetail}>YOUA</td>
                    <td>ZCZX-1232-ASD5</td>
                    <td>USA-BMW-2020-X Series- X5 Out Front</td>
                    <td>Bumper(Bikini, Wrapped, Sensors)</td>
                    <td>2021.09.13</td>
                    <td>$1.0</td>
                    <td>26,05ft</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>Aiara</td>
                    <td>ZCZX-1232-ASD5</td>
                    <td>USA-BMW-2020-X Series- X5 Out Front</td>
                    <td>Bumper(Bikini, Wrapped, Sensors)</td>
                    <td>2021.09.13</td>
                    <td>$1.0</td>
                    <td>26,05ft</td>
                    <td>90</td>
                  </tr>
                  <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
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

          :

          <div>
            <h5 className="ms-3 mt-3">
              Pattern Management - Pattern List - Pattern Details
            </h5>
            <hr />
            <div className="ms-3">
              <>
                <div className={styles.detailDesc}>Uploader Information </div>
                <div className="d-flex ">
                  <table className={styles.infoTable} border={1}>
                    <tr>
                      <td className={styles.key}>Uploader</td>
                      <td className={styles.value}>Ivan</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Company</td>
                      <td className={styles.value}>Aiara</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Country</td>
                      <td className={styles.value}>Korea</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Join Date</td>
                      <td className={styles.value}>2021.01.01</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Contact Email</td>
                      <td className={styles.value}>google@gmail.com</td>
                    </tr>
                  </table>
                  <table className={styles.infoTable}>
                    <div className="d-flex">
                      <div className={styles.pict}>CI/BI Image</div>
                      <img src="#" alt="" className={styles.image} />
                    </div>
                  </table>
                </div>
                <div className={styles.introBlock}>
                  <div className={styles.intro}>Introduction</div>
                  <div className={styles.introInfo}></div>
                </div>
              </>
              <div className="mt-4 mb-5">
                <div className="d-flex align-items-center">
                  <div className={styles.detailDesc}>Pattern Information </div>
                  <div className={styles.unicode}>ZCZX-1232-ASD5</div>
                </div>
                <div className="d-flex ">
                  <table className={styles.infoTable} border={1}>
                    <tr>
                      <td className={styles.key}>Region</td>
                      <td className={styles.value}>USA</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Maker</td>
                      <td className={styles.value}>Hyundai</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Year</td>
                      <td className={styles.value}>2020</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Model</td>
                      <td className={styles.value}>Solaris</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Sub Model</td>
                      <td className={styles.value}>-</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Series</td>
                      <td className={styles.value}>-</td>
                    </tr>
                  </table>
                  <table className={styles.infoTable} border={1}>
                    <tr>
                      <td className={styles.key}>Side</td>
                      <td className={styles.value}>Out Front</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Pattern Part</td>
                      <td className={styles.value}>Bumper</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Sub Part</td>
                      <td className={styles.value}>Bikini</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Tag</td>
                      <td className={styles.value}>#Tag #Tag2 #Tag3</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Price</td>
                      <td className={styles.value}>$1.0</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Area</td>
                      <td className={styles.value}>-</td>
                    </tr>
                  </table>
                </div>
                <div className={styles.editor}>
                  <CButton color="dark" variant="outline" className>
                    Editor
                  </CButton>
                </div>
                <div className={styles.introBlock}>
                  <div className={styles.intro}>Pattern File</div>
                  <div className={styles.introInfo}></div>
                </div>
                <div className={styles.introBlock}>
                  <div className={styles.intro}>Description Memo</div>
                  <div className={styles.introInfo}></div>
                </div>
              </div>
              <>
                <div className={styles.detailDesc}>Sales Information </div>
                <div className="d-flex ">
                  <div className="me-5">
                    <table className={styles.infoTable} border={1}>
                      <tr>
                        <td className={styles.key}>Earning Sum</td>
                        <td className={styles.value}>$10,000</td>
                      </tr>
                      <tr>
                        <td className={styles.key}>Downloads</td>
                        <td className={styles.value}>100</td>
                      </tr>
                      <tr>
                        <td className={styles.key}>Cut Area Sum</td>
                        <td className={styles.value}>1500ft</td>
                      </tr>
                      <tr>
                        <td className={styles.key}>Size Score</td>
                        <td className={styles.value}>4.5</td>
                      </tr>
                      <tr>
                        <td className={styles.key}>Shape Score</td>
                        <td className={styles.value}>4.0</td>
                      </tr>
                    </table>
                  </div>
                  <div>
                    <table className={styles.salesTable} border={1}>
                      <tr>
                        <th colSpan={5}>Review</th>
                      </tr>
                      <tr>
                        <td>1 YOUA</td>
                        <td>Make something</td>
                        <td>2012.12.12 07:35pm(KR)</td>
                        <td>
                          <CButton color="danger">delete</CButton>
                        </td>
                      </tr>
                      <tr>
                        <td>1 YOUA</td>
                        <td>Make something</td>
                        <td>2012.12.12 07:35pm(KR)</td>
                        <td>
                          <CButton color="danger">delete</CButton>
                        </td>
                      </tr>
                      <tr>
                        <td>1 YOUA</td>
                        <td>Make something</td>
                        <td>2012.12.12 07:35pm(KR)</td>
                        <td>
                          <CButton color="danger">delete</CButton>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="text-center me-5 mt-3 mb-5">
                  <CButton color="danger" className="text-white me-5" size="lg">
                    Stop selling
                  </CButton>
                  <CButton
                    color="dark"
                    variant="outline"
                    className=" pe-5 ps-5 me-5"
                    size="lg"
                    onClick={goToList}
                  >
                    List
                  </CButton>
                </div>
              </>
            </div>
          </div>
      }

    </div>
  );
};

export default PatternList;
