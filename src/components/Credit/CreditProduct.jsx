import React, { useState, useContext, useEffect } from "react"
import { NavLink } from "react-router-dom";
import { CButton } from "@coreui/react";
import styles from "./credit.module.css";
import { AuthContext } from "../../context/AuthContext";

const setActive = (isActive) => (isActive ? styles.activeLink : styles.link);

const CreditProduct = () => {
  const auth = useContext(AuthContext)
  const [Auth, setAuth] = useState()
  const [allCreditProduct, setAllCreditProduct] = useState()
  const [nowSeeCreditProduct, setNowSeeCreditProduct] = useState()
  const [creditInfo, setcreditInfo] = useState({
    name: "standart",
    cost: 100,
    recharge: 100,
    bonus: 5
  })

  const changeHandlerName = Name => { // считывает из формы
    setAuth(creditInfo => ({ ...creditInfo, name: Name }))


  }

  const changeHandler = event => { // считывает из формы
    setAuth(creditInfo => ({ ...creditInfo, [event.target.name]: event.target.value }))
  }

  const searchHandler = async () => {

    const responce = await fetch('http://localhost:80/admin/getAllCreditProducts', {
      method: 'POST', body: JSON.stringify(Auth), headers: { 'Content-Type': 'application/json' }
    })
    let data = await responce.json()
    setAllCreditProduct(data)
    setcreditInfo(data.products[0])

    console.log('test');
  }

  const setHandler = async () => {

    const responce = await fetch('http://localhost:80/admin/setCreditProduct', {
      method: 'POST', body: JSON.stringify(Auth), headers: { 'Content-Type': 'application/json' }
    })

    const data = await responce.json()
  }

  // useEffect(() => {
  //   if (auth && auth.token) {
  //     setAuth({ id: auth.userId, jwt: auth.token })
  //   }
  //   searchHandler()
  // }, [setAuth])
    
  // useEffect(() => {
  //   if(Auth) searchHandler()
  // }, [Auth])

  // useEffect(() => {
  //   searchHandler()
  // }, [])

  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Credit Charge Management - Credit Product</h5>
      <hr />
      <div className={styles.content}>
        <div className="d-flex border-bottom ">
          <NavLink to="#" className={setActive} onClick={() => changeHandlerName('standard')} >
            Standard
          </NavLink>
          <NavLink to="#" className={setActive} onClick={() => changeHandlerName('plus')} >
            Plus
          </NavLink>
          <NavLink to="#" className={setActive} onClick={() => changeHandlerName('premium')} >
            Premium
          </NavLink>
          <NavLink to="#" className={setActive} onClick={() => changeHandlerName('gold')} >
            Gold
          </NavLink>
        </div>
        <div className={styles.container}>
          <div className="d-flex text-start mt-5">
            <p className={styles.desc}>Cost</p>
            <input type="text" onChange={changeHandler} name="cost" value={creditInfo.cost} />
          </div>
          <div className="d-flex text-start mt-3">
            <p className={styles.desc}>Recharge Credit</p>
            <input type="text" onChange={changeHandler} name="recharge" value={creditInfo.recharge} />
          </div>
          <div className="d-flex text-start mt-3">
            <p className={styles.desc}>Bonus Credit</p>
            <input type="text" onChange={changeHandler} name="bonus" value={creditInfo.bonus} />
          </div>
          <div className="d-flex text-start mt-3 mb-5">
            <p className={styles.desc}>Total Credit</p>
            <p className={styles.desc}>{Number(creditInfo.recharge) + Number(creditInfo.bonus)} Credit</p>
          </div>
        </div>
        <div className="text-center mb-4">
          <CButton color="dark" variant="outline" className="me-3" onClick={setHandler}>
            SAVE
          </CButton>
          <CButton color="dark" variant="outline">
            RESET
          </CButton>
        </div>
      </div>
    </div>
  );
};

export default CreditProduct;
