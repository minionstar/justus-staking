import React from "@heroicons/react";
import NavComponent from "./components/navbar"
import { useState } from "react";
import NativeStake from "./components/native_stake";
import LPStake from "./components/lp_stake";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <main className="main">
      <NavComponent 
        setActiveTab = {setActiveTab}
        activeTab = {activeTab}
      />
      <div className="content h-[100%]">
        {
          activeTab == 0 
            ? 
              <div className="flex flex-col md:flex-row space-between p-5">
                <NativeStake />
                <NativeStake />
              </div>
            :
              <div>Tab 2</div>
        }
      </div>
    </main>
  );
}
