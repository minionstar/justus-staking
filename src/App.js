import React from "@heroicons/react";
import NavComponent from "./components/navbar";
import { useState } from "react";
import NativeStake from "./components/native_stake";
import LPStake from "./components/lp_stake";
import PartnerCard from "./components/partner_card";

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="main">
      <NavComponent setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="content h-[100%]">
        {activeTab == 0 ? (
          <div className="p-5">
            <p className="text-xl mb-5 font-semibold">Staking</p>
            <div className="flex flex-col md:flex-row  gap-3">
              <NativeStake />
              <LPStake />
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </main>
  );
}
