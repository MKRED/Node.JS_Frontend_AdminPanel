import React from "react";
import MemberMenu from "./MemberMenu";
import styles from "./menu.module.css";
import { CAccordion } from "@coreui/react";
import CreditMenu from "./CreditMenu";
import MerchantMenu from "./MerchantMenu";
import WithdrawalMenu from "./WithdrawalMenu";
import PatternMenu from "./PatternMenu";
import SponsorMenu from "./SponsorMenu";
import UltraMenu from "./UltraMenu";
import CouponMenu from "./CouponMenu";
import EmailMenu from "./EmailMenu";
import BannerMenu from "./BannerMenu";
import PreferenceMenu from "./PreferenceMenu";

const setActive = (isActive) => (isActive ? styles.active_link : styles.link);

const Menu = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.fixed}>
        <CAccordion>
          <MemberMenu setActive={setActive} />
          <CreditMenu setActive={setActive} />
          <MerchantMenu setActive={setActive} />
          <WithdrawalMenu setActive={setActive} />
          <PatternMenu setActive={setActive} />
          <SponsorMenu setActive={setActive} />
          <UltraMenu setActive={setActive} />
          <CouponMenu setActive={setActive} />
          <EmailMenu setActive={setActive} />
          <BannerMenu setActive={setActive} />
          <PreferenceMenu setActive={setActive} />
        </CAccordion>
      </div>
    </div>
  );
};

export default Menu;
