import React from "@heroicons/react";
import NavComponent from "./components/navbar";
import { useState } from "react";
import StakeComponent from "./scenes/stake/stake";
import PartnerComponent from "./scenes/partner/partner";

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="main">
      <NavComponent setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="content h-[100%]">
        {activeTab == 0 ? (
          <StakeComponent />
        ) : (
          <PartnerComponent />
        )}
      </div>
    </main>
  );
}
