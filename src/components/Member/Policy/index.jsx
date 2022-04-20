import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { CButton } from "@coreui/react";
import styles from "./policy.module.css";

const setActive = (isActive) => (isActive ? styles.active_link : styles.link);

const MembershipPolicy = () => {

  const [country, setCountry] = useState('Korea')
  const [policy, setPolicy] = useState('')

  const getpolicyHandler = async () => {

    const responce = await fetch('http://localhost:80/getPolicy', {
      method: 'POST', body: JSON.stringify(country), headers: {'Content-Type': 'application/json'}
    })
    const data = await responce.json()

    console.log('Data', data, country);
  }

  const setPolicyHandler = async () => {

    const responce = await fetch('http://localhost:80/admin/setPolicy', {
      method: 'POST', body: JSON.stringify(policy), headers: {'Content-Type': 'application/json'}
    })
    const data = await responce.json()

    console.log('Data', data, policy);
  }

  

  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Membership Policy</h5>
      <hr />
      <div className="ms-4">
        <div className="d-flex mb-5">
          <NavLink className={setActive} to="/privacy">
            Privacy
          </NavLink>
          <NavLink className={setActive} to="/service">
            Korean Nationality service
          </NavLink>
        </div>
        <textarea name="" id="" cols="130" rows="17" />
      </div>
      <div className="text-center">
        <CButton color="dark" variant="outline" className="ps-5 pe-5 me-3">
          <b>SAVE</b>
        </CButton>
        <CButton color="dark" variant="outline" className="ps-5 pe-5">
          <b>RESET</b>
        </CButton>
      </div>
    </div>
  );
};

export default MembershipPolicy;
