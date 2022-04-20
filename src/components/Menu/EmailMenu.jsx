import React from "react";
import styles from "./menu.module.css";
import { CAccordionButton, CAccordionItem } from "@coreui/react";
import { NavLink } from "react-router-dom";

const setActive = (isActive) => (isActive ? styles.mail : styles.activeMail);

const EmailMenu = () => {
  return (
    <CAccordionItem className={styles.accordion_item} itemKey={9}>
      <CAccordionButton className={styles.accordion_heading}>
        <NavLink to="/email/list" className={setActive}>
          Email Management
        </NavLink>
      </CAccordionButton>
      {/*<CAccordionBody className={styles.accordion_body}>*/}
      {/*  <NavLink to="/email/list" className={setActive}>*/}
      {/*    Email List*/}
      {/*  </NavLink>*/}
      {/*  <NavLink to="/mailing/list" className={setActive}>*/}
      {/*    Add coupon*/}
      {/*  </NavLink>*/}
      {/*</CAccordionBody>*/}
    </CAccordionItem>
  );
};

export default EmailMenu;
