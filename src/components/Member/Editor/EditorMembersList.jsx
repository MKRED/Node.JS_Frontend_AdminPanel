import React, { useState, useContext, useEffect } from "react"
import styles from "./editor.module.css";
import { CButton } from "@coreui/react";
import { AuthContext } from "../../../context/AuthContext";


const EditorMembersList = () => {
  const auth = useContext(AuthContext)
  const [form, setForm] = useState()
  const [data, setData] = useState('')


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

  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Editor Subscription</h5>
      <hr />
      <div className="me-3 ms-3">
        <h6>Member Search</h6>
        <form action="" className="d-flex justify-content-center mt-4" id="resForm">
          <span className={styles.desc}>Search Term</span>
          <select onChange={changeHandler} name="status" >
            <option>All</option>
            <option>Active</option>
            <option>Suspended</option>
            <option>Secession</option>
          </select>
          <input type="text" className="me-2 ms-2" onChange={changeHandler} name="search" id='test' />
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
          <CButton color="dark" className="border-0 me-2" onClick={searchHandler}>
            Search
          </CButton>
          <CButton color="dark" onClick={resetHandler}>Reset</CButton>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className={styles.total}>
            Total <b className="text-dark">{data.status == 'ok' ? data.users.length : '0'}</b>
          </span>
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
              <th>Start</th>
              <th>Payment Data</th>
            </tr>
          </thead>
          <tbody>
            {
              data.status === 'ok' && data.users.length !== 0 ?

                data.users.map((datas, index) => {
                  return (
                    <tr>
                      <td id={index}>{datas.id}</td>
                      <td>{datas.nick}</td>
                      <td>{datas.email}</td>
                      <td>{datas.phone}</td>
                      <td>{datas.country}</td>
                      <td>{datas.level}</td>
                      <td>{datas.created}</td>
                      <td>{datas.paymentData}</td>
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
  );
};

export default EditorMembersList;
