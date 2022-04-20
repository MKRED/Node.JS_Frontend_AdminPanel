import React from "react";
import styles from "./menu.module.css";
import {
  CAccordionButton,
  CAccordionItem,
} from "@coreui/react";
import { NavLink } from "react-router-dom";

const setActive = (isActive) => (isActive ? styles.mail : styles.activeMail);


const BannerMenu = () => {
  return (
    <CAccordionItem className={styles.accordion_item} itemKey={11}>
      <CAccordionButton className={styles.accordion_heading}>
        <NavLink to="/banners/list" className={setActive}>Banner Management</NavLink>
      </CAccordionButton>
      {/*<CAccordionBody className={styles.accordion_body}>*/}
      {/*  <NavLink to="/banners/list" className={setActive}>*/}
      {/*    Banners List*/}
      {/*  </NavLink>*/}
      {/*  <NavLink to="/banner/add" className={setActive}>*/}
      {/*    Add banner*/}
      {/*  </NavLink>*/}
      {/*</CAccordionBody>*/}
    </CAccordionItem>
  );
};

export default BannerMenu;
