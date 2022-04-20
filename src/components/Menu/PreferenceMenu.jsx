import React from "react";
import styles from "./menu.module.css";
import {
  CAccordionBody,
  CAccordionButton,
  CAccordionItem,
} from "@coreui/react";
import { NavLink } from "react-router-dom";

const PreferenceMenu = ({ setActive }) => {
  return (
    <CAccordionItem className={styles.accordion_item} itemKey={12}>
      <CAccordionButton className={styles.accordion_heading}>
        Preferences
      </CAccordionButton>
      <CAccordionBody className={styles.accordion_body}>
        <NavLink to="/service/unit/price" className={setActive}>
          Service Use Unit Price
        </NavLink>
        <NavLink to="/admin/settings" className={setActive}>
          Admin Settings
        </NavLink>
        <NavLink to="/shipping/setting" className={setActive}>
          Settings The Shipping Fee
        </NavLink>
      </CAccordionBody>
    </CAccordionItem>
  );
};

export default PreferenceMenu;
