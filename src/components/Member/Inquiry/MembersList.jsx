import React, { useState, useContext, useEffect } from "react"
import styles from "./member.module.css"
import { CButton } from "@coreui/react"
import { AuthContext } from "../../../context/AuthContext";

const MembersList = () => {
  const auth = useContext(AuthContext)
  const [form, setForm] = useState()
  const [seeInfo, setSeeInfo] = useState(false)
  const [data, setData] = useState('')
  const [nowSeeData, setNowSeeData] = useState('')


  const changeHandler = event => { // считывает из формы
    if (event.target.name === 'status' && event.target.value === 'All')
      return setForm(form => ({ ...form, [event.target.name]: null }))
    setForm(form => ({ ...form, [event.target.name]: event.target.value }))
  }

  const checkboxHandler = (levelName) => {
    let tmp
    if (form.levels) {
      tmp = form.levels
      let index = tmp.findIndex(tmp => tmp === levelName)
      if (index === -1) tmp.push(levelName)
      else tmp.splice(index, 1)
    }
    else {
      return setForm({ ...form, levels: [levelName] })
    }
    setForm({ ...form, levels: tmp })
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
    const responce = await fetch('http://localhost:80/admin/getUsersList', {
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
            <h5 className="ms-3 mt-3">inquiry/management</h5>
            <hr />
            <div className="ms-3 me-3">
              <h6>Member Search</h6>
              <form className="d-flex justify-content-center mt-4" id="resForm">
                <span className={styles.desc}>Search Term</span>
                <select onChange={changeHandler} name="status" >
                  <option>All</option>
                  <option>Active</option>
                  <option>Suspended</option>
                  <option>Secession</option>
                </select>
                <input type="text" className="me-2 ms-2" onChange={changeHandler} name="search" />
                <span className={styles.desc}>Member Level</span>
                <div className={styles.checks}>
                  <input type="checkbox" className="me-1" onChange={() => checkboxHandler('begginer')} />
                  <span className="me-2">Beginner</span>
                  <input type="checkbox" className="me-1" onChange={() => checkboxHandler('advanced')} />
                  <span className="me-2">Advanced</span>
                  <input type="checkbox" className="me-1" onChange={() => checkboxHandler('expert')} />
                  <span className="me-2">Expert</span>
                  <input type="checkbox" className="me-1" onChange={() => checkboxHandler('master')} />
                  <span>Master</span>
                </div>
              </form>
              <div className="text-center mt-5">
                <CButton onClick={searchHandler} color="dark" className="border-0 me-2">
                  Search
                </CButton>
                <CButton color="dark" onClick={resetHandler}>Reset</CButton>
              </div>
              <div className="d-flex justify-content-between align-items-center  w-100">
                <span className={styles.total}>
                  Total <b className="text-dark">{data.status === 'ok' ? data.users.length : '0'}</b>
                </span>
                <CButton color="danger" className="text-white ">
                  Member Suspension
                </CButton>
              </div>
              <table className={styles.memberTable} border={1}>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Country</th>
                    <th>Member Level</th>
                    <th>Credit</th>
                    <th>Join Date</th>
                    <th>Secession</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.status === 'ok' && data.users.length !== 0 ?

                      data.users.map((datas, index) => {
                        return (
                          <tr>
                            <td onClick={goToList} id={index}>{datas.id}</td>
                            <td>{datas.nick}</td>
                            <td>{datas.email}</td>
                            <td>{datas.phone}</td>
                            <td>{datas.country}</td>
                            <td>{datas.level}</td>
                            <td>{datas.credit}</td>
                            <td>{datas.created}</td>
                            {datas.deletedTime ? <td> {datas.deletedTime} </td> : <td> <input type="checkbox" /> </td>}
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
                        <td>
                          <input type="checkbox" />
                        </td>
                      </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          :

          <div>
            <h5 className="ms-3 mt-3">inquiry/management</h5>
            <hr />
            <div className="p-4">
              <>
                <div className={styles.memberDesc}>Basic Information</div>
                <div className="d-flex mt-4">
                  <table className={styles.memberInfoTable} border={1}>
                    <tr>
                      <td className={styles.key}>First Name</td>
                      <td className={styles.value}>{nowSeeData.firstName}</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Sur Name</td>
                      <td className={styles.value}>{nowSeeData.surName}</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Display Name</td>
                      <td className={styles.value}>{nowSeeData.nick}</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Phone Number</td>
                      <td className={styles.value}>{nowSeeData.phone}</td>
                    </tr>
                  </table>
                  <table className={styles.memberInfoTable} border={1}>
                    <tr>
                      <td className={styles.key}>Email Address</td>
                      <td className={styles.value}>{nowSeeData.email}</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Join Date</td>
                      <td className={styles.value}>{nowSeeData.created}</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Profile Photo</td>
                      <td className={styles.value}>
                        <img src="#" alt="" className={styles.profilePhoto} />
                      </td>
                    </tr>
                  </table>
                </div>
              </>
              <div className="mt-5">
                <div className={styles.memberDesc}>Address</div>
                <div className="d-flex mt-3">
                  <table className={styles.memberInfoTable} border={1}>
                    <tr>
                      <td className={styles.key}>Country</td>
                      <td className={styles.value}>{nowSeeData.country}</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Address</td>
                      <td className={styles.value}>{nowSeeData.adress1}</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Address 2</td>
                      <td className={styles.value}>{nowSeeData.adress2}</td>
                    </tr>
                  </table>
                  <table className={styles.memberInfoTable} border={1}>
                    <tr>
                      <td className={styles.key}>Postal Code</td>
                      <td className={styles.value}>{nowSeeData.postalCode}</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>City</td>
                      <td className={styles.value}>{nowSeeData.city}</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>State/Region</td>
                      <td className={styles.value}>{nowSeeData.stateRegion}</td>
                    </tr>
                    <tr>
                      <td className={styles.key}>Company Name</td>
                      <td className={styles.value}>{nowSeeData.compantName}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div className="text-center">
              <CButton
                color="dark"
                variant="outline"
                size="lg"
                className="pe-5 ps-5 align-content-center "
                onClick={goToInfo}
              >
                List
              </CButton>
            </div>
          </div>
      }


    </div>
  );
};

export default MembersList;
