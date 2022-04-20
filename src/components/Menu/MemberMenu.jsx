import React from "react";
import styles from "./menu.module.css";
import {
  CAccordionBody,
  CAccordionButton,
  CAccordionItem,
} from "@coreui/react";
import { NavLink } from "react-router-dom";

const MemberMenu = ({ setActive }) => {
  return (
    <CAccordionItem className={styles.accordion_item} itemKey={1}>
      <CAccordionButton className={styles.accordion_heading}>
        Member Management
      </CAccordionButton>
      <CAccordionBody className={styles.accordion_body}>
        <NavLink to="/inquiry/management" className={setActive}>
          Inquiry/management
        </NavLink>
        <NavLink to="/membership/policy" className={setActive}>
          Membership Policy
        </NavLink>
        <NavLink to="/editor/subscription" className={setActive}>
          Editor Subscription
        </NavLink>
      </CAccordionBody>
    </CAccordionItem>
  );
};

export default MemberMenu;
