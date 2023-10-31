import React from "react";
import NativeStake from "./native_stake";
import LPStake from "./lp_stake";

export default function StakeComponent(props) {
  return (
    <div className="p-5  pt-9">
      <p className="text-xl mb-5 font-semibold">Staking</p>
      <div className="flex flex-col md:flex-row  gap-3">
        <NativeStake />
        <LPStake />
      </div>
    </div>
  );
}
