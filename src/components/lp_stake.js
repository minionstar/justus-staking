import React from "@heroicons/react";
import { useState } from "react";

export default function LPStake() {
  const [activeTab, setActiveTab] = useState(0)

  return (
      <div className="lp-stake w-[50%]">
        <div className="bg-[#22194780] w-[100%] text-center p-12">LP Tokens</div>
      </div>
  );
}