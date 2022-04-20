import React from "react";
import styles from "./menu.module.css";
import {
  CAccordionBody,
  CAccordionButton,
  CAccordionItem,
} from "@coreui/react";
import { NavLink } from "react-router-dom";

const SponsorMenu = ({ setActive }) => {
  return (
    <CAccordionItem className={styles.accordion_item} itemKey={6}>
      <CAccordionButton className={styles.accordion_heading}>
        Sponsor AD Item
      </CAccordionButton>
      <CAccordionBody className={styles.accordion_body}>
        <NavLink to="/sponsor/ad/item/list" className={setActive}>
          Sponsor AD Item List
        </NavLink>
        <NavLink to="/sponsor/ad/item/price" className={setActive}>
          Sponsor AD Item Price
        </NavLink>
      </CAccordionBody>
    </CAccordionItem>
  );
};

export default SponsorMenu;
