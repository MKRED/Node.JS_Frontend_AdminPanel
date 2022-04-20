import React from "react";
import styles from "./menu.module.css";
import {
  CAccordionBody,
  CAccordionButton,
  CAccordionItem,
} from "@coreui/react";
import { NavLink } from "react-router-dom";

const setActive = (isActive) => (isActive ? styles.active_link : styles.link);

const MerchantMenu = () => {
  return (
    <CAccordionItem className={styles.accordion_item} itemKey={3}>
      <CAccordionButton className={styles.accordion_heading}>
        Merchant Management
      </CAccordionButton>
      <CAccordionBody className={styles.accordion_body}>
        <NavLink to="/merchant/list" className={setActive}>
          Merchant List
        </NavLink>
        <NavLink to="/merchant/terms" className={setActive}>
          T&C
        </NavLink>
      </CAccordionBody>
    </CAccordionItem>
  );
};

export default MerchantMenu;
