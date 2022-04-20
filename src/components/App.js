import MemberRoutes from "./Routes/MemberRoutes";
import { BrowserRouter } from "react-router-dom";
import CreditRoutes from "./Routes/CreditRoutes";
import Menu from "./Menu";
import MerchantRoutes from "./Routes/MerchantRoutes";
import WithdrawalRoutes from "./Routes/WithdrawalRoutes";
import PatternRoutes from "./Routes/PatternRoutes";
import SponsorRoutes from "./Routes/SponsorRoutes";
import UltrafitRoutes from "./Routes/UltrafitRoutes";
import CouponRoutes from "./Routes/CouponRoutes";
import EmailRoutes from "./Routes/EmailRoutes";
import BannerRoutes from "./Routes/BannerRoutes";
import PreferencesRoutes from "./Routes/PreferencesRoutes";
import { useState, useCallback, useEffect } from "react";

import React from "react";
import styles from "./SignIn/signIn.module.css";
import logo from "../assets/PLOFIX_BI.jpg";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const storageName = 'userData'

function App() {
  // const auth = useContext(AuthContext)
  const [form, setForm] = useState({
    email: '', pass: ''
  })
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const isAuth = !!token

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId)
    }
  }, [login])

  const changeHandler = event => { // считывает из формы
    setForm(form => ({ ...form, [event.target.name]: event.target.value }))
  }

  const loginHandler = async () => {
    const AuthRes = await fetch('http://localhost:80/loginByPass', {
      method: 'POST', body: JSON.stringify(form), headers: { 'Content-Type': 'application/json' }
    })
    let Auth = await AuthRes.json()

    login(Auth.jwt, Auth.id)
  }

  
  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuth
    }}>
      <BrowserRouter>

        {
          isAuth ?

            <div className="d-flex">
              <Menu />
              <MemberRoutes />
              <CreditRoutes />
              <MerchantRoutes />
              <WithdrawalRoutes />
              <PatternRoutes />
              <SponsorRoutes />
              <UltrafitRoutes />
              <CouponRoutes />
              <EmailRoutes />
              <BannerRoutes />
              <PreferencesRoutes />
            </div>

            :

            <div className={styles.container}>
              <div className={styles.contBg}>
                <div className={styles.contIcon}>
                  <img src={logo} alt="" />
                </div>
              </div>
              <div className={styles.formInput}>
                <div className={styles.text}>Email:</div>
                <input type="text" className={styles.inp} onChange={changeHandler} name="email" />
              </div>
              <div className={styles.formInput}>
                <div className={styles.text}>Password:</div>
                <input type="password" className={styles.inp} onChange={changeHandler} name="pass" />
              </div>
              <div className="d-flex justify-content-center mt-4">
                <div>
                  <input type="checkbox" />
                  <span className="ms-2">Auto Login</span>
                </div>
                <button className={styles.btn} onClick={loginHandler}>log in</button>
              </div>
            </div>

        }

      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
