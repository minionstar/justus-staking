import React from "@heroicons/react";
import { useState } from "react";
import { TooltipComponent } from "./tooltip";
import IconTotalStakedToken from "../assets/images/icons/total-token-staked.png"
import StakedAmountCard from "./staked_amount_card";
import IconBalanceJustusToken from "../assets/images/icons/balance-justus-token.png"

export default function NativeStake() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="native-stake w-[100%] md:w-[50%] mr-3 text-sm">
      <div className="bg-[#376eab] w-[100%] text-center p-8 mb-2 rounded-xl">
        Justus Tokens
      </div>
      <div className="bg-[#376eab] w-[100%] p-5  rounded-xl mt-3">
        <span className="mr-2">Stake Justus Token</span>
        <TooltipComponent
          content={
            "Select the amount of tokens you would like to stake. Hit “Approve” and then “Stake” and confirm both transactions in your wallet.le"
          }
        />
        <span className="ml-2 cursor-pointer">Max</span>
        <div className="flex flex-row justify-between mt-3">
          <input
            type="text"
            id="justus-amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
            placeholder="0"
            required
          />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2">
            Approve
          </button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2">
            Stake
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-3">
        <StakedAmountCard icon={IconTotalStakedToken} text={"Total Token Staked"} balance={0.0} />
        <StakedAmountCard icon={IconBalanceJustusToken} text={"Total Token Staked"} balance={0.0} />
      </div>
    </div>
  );
}
