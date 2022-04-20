import React from "react";
import styles from "./menu.module.css";
import {
  CAccordionBody,
  CAccordionButton,
  CAccordionItem,
} from "@coreui/react";
import { NavLink } from "react-router-dom";

const WithdrawalMenu = ({ setActive }) => {
  return (
    <CAccordionItem className={styles.accordion_item} itemKey={4}>
      <CAccordionButton className={styles.accordion_heading}>
        Withdrawal Management
      </CAccordionButton>
      <CAccordionBody className={styles.accordion_body}>
        <NavLink to="/withdrawal/receipt/list" className={setActive}>
          Withdrawal Receipt List
        </NavLink>
        <NavLink to="/withdrawal/completed/list" className={setActive}>
          Withdrawal Completed List
        </NavLink>
      </CAccordionBody>
    </CAccordionItem>
  );
};

export default WithdrawalMenu;
