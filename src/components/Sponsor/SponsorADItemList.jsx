import React from "react";
import SponsorAdListTitle from "./SponsorADListTitle";
import SponsorAdListTable from "./SponsorADListTable";

const SponsorAdItemList = () => {
  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Sponsor AD Item List</h5>
      <hr />
      <div className="ms-3 me-3">
        <SponsorAdListTitle />
        <SponsorAdListTable />
      </div>
    </div>
  );
};

export default SponsorAdItemList;
