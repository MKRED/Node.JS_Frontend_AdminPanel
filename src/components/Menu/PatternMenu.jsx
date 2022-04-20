import React from "react";
import styles from "./menu.module.css";
import {
  CAccordionBody,
  CAccordionButton,
  CAccordionItem,
} from "@coreui/react";
import { NavLink } from "react-router-dom";

const PatternMenu = ({ setActive }) => {
  return (
    <CAccordionItem className={styles.accordion_item} itemKey={5}>
      <CAccordionButton className={styles.accordion_heading}>
        Pattern Management
      </CAccordionButton>
      <CAccordionBody className={styles.accordion_body}>
        <NavLink to="/pattern/approval/list" className={setActive}>
          Approval/Registration
        </NavLink>
        <NavLink to="/pattern/list" className={setActive}>
          Pattern list
        </NavLink>
        <NavLink
          to={"/pattern/category/vehicle/management"}
          className={setActive}
        >
          Category
        </NavLink>
        <NavLink to="/pattern/miss" className={setActive}>
          Miss Cut
        </NavLink>
      </CAccordionBody>
    </CAccordionItem>
  );
};

export default PatternMenu;
