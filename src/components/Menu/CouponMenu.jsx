import React from "react";
import styles from "./menu.module.css";
import {
  CAccordionBody,
  CAccordionButton,
  CAccordionItem,
} from "@coreui/react";
import { NavLink } from "react-router-dom";

const CouponMenu = ({ setActive }) => {
  return (
    <CAccordionItem className={styles.accordion_item} itemKey={8}>
      <CAccordionButton className={styles.accordion_heading}>
        Coupon Management
      </CAccordionButton>
      <CAccordionBody className={styles.accordion_body}>
        <NavLink to="/coupon/list" className={setActive}>
          Coupon List
        </NavLink>
        <NavLink to="/coupon/add" className={setActive}>
          Add coupon
        </NavLink>
      </CAccordionBody>
    </CAccordionItem>
  );
};

export default CouponMenu;
