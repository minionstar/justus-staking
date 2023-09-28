import React, { useState } from "react";
import PartnerCard from "./partner_card";
import PartnerModal from "../../components/modal";

export default function PartnerComponent() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="w-full flex flex-col p-5">
      <p className="text-xl mb-5 font-semibold">Partners</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        <PartnerCard setShowModal={setShowModal} />
        <PartnerCard setShowModal={setShowModal} />
        <PartnerCard setShowModal={setShowModal} />
        <PartnerCard setShowModal={setShowModal} />
        <PartnerCard setShowModal={setShowModal} />
        <PartnerCard setShowModal={setShowModal} />
        <PartnerCard setShowModal={setShowModal} />
        <PartnerCard setShowModal={setShowModal} />
        <PartnerCard setShowModal={setShowModal} />
        <PartnerCard setShowModal={setShowModal} />
        <PartnerCard setShowModal={setShowModal} />
      </div>
      <PartnerModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
