import React from "react";
import PartnerCard from "./partner_card";

export default function PartnerComponent() {
  return (
    <div className="w-full flex flex-col p-5">
      <p className="text-xl mb-5 font-semibold">Partners</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
      </div>
    </div>
  );
}
