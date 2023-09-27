import React from "@heroicons/react";
import { useState } from "react";
import IconTotalStakedToken from "../assets/images/icons/total-token-staked.png";

export default function StakedAmountCard(props) {
const {icon, text, balance} =  props;
  return (
    <div className="flex flex-col items-center bg-[#376eab] w-[100%] text-center p-8 mb-5 rounded-xl mr-3">
      <img src={icon} className="h-10 w-10" />
      <p className="py-5 text-sm">{text}</p>
      <p className="text-xl">{balance}</p>
    </div>
  );
}
