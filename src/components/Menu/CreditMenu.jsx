import React from "react";
import styles from "./menu.module.css";
import {
  CAccordionBody,
  CAccordionButton,
  CAccordionItem,
} from "@coreui/react";
import { NavLink } from "react-router-dom";

const CreditMenu = ({ setActive }) => {
  return (
    <CAccordionItem className={styles.accordion_item} itemKey={2}>
      <CAccordionButton className={styles.accordion_heading}>
        Credit Charge Management
      </CAccordionButton>
      <CAccordionBody className={styles.accordion_body}>
        <NavLink to="/credit/product" className={setActive}>
          Credit product
        </NavLink>
        <NavLink to="/purchase/list" className={setActive}>
          Purchase history list
        </NavLink>
        <NavLink to="/refund/list" className={setActive}>
          Refund Management List
        </NavLink>
        <NavLink to="/gift/management" className={setActive}>
          Gift Credit Management
        </NavLink>
      </CAccordionBody>
    </CAccordionItem>
  );
};

export default CreditMenu;
