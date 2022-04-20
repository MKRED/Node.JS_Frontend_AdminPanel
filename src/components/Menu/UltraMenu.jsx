import React from "react";
import styles from "./menu.module.css";
import {
  CAccordionBody,
  CAccordionButton,
  CAccordionItem,
} from "@coreui/react";
import { NavLink } from "react-router-dom";

const UltraMenu = ({ setActive }) => {
  return (
    <CAccordionItem className={styles.accordion_item} itemKey={7}>
      <CAccordionButton className={styles.accordion_heading}>
        Ultrafit Shop Management
      </CAccordionButton>
      <CAccordionBody className={styles.accordion_body}>
        <NavLink to="/ultrafit/products/list" className={setActive}>
          Product Management
        </NavLink>
        <NavLink to="/ultrafit/category" className={setActive}>
          Category
        </NavLink>
        <NavLink to="/ultrafit/order/delivery" className={setActive}>
          Order Delivery Management
        </NavLink>
        <NavLink to="/ultrafit/order/cancellation" className={setActive}>
          Order Cancellation
        </NavLink>
      </CAccordionBody>
    </CAccordionItem>
  );
};

export default UltraMenu;
