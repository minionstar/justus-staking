import React from "@heroicons/react";
import { useState } from "react";
import { TooltipComponent } from "./tooltip";

export default function UnstakedRewardCard(props) {
  const { icon1, icon2, text1, text2, balance } = props;
  return (
    <div className="bg-[#376eab]  p-5 mb-5 rounded-xl">
      <div className="flex flex-row items-center  w-[100%] text-center mb-3">
        <div className="flex flex-row items-center w-[100%] text-center">
          <img src={icon1} className="h-10 w-10" />
          <div className="pt-1 ml-2">
            <div className="py-5 text-xs py-0 flex flex-row items-center text-left">
              {text1}
              <TooltipComponent
                content={"UTax reduces by 4% monthly until month 24 onwards where it will be fixed at 4%. Starting tax for the first month is 96 %"}
              />
            </div>
            <p className="text-xl text-start">{balance}</p>
          </div>
        </div>
        <div className="flex flex-row w-[100%] justify-between">
          <div class="relative w-full">
            <input
              type="text"
              class="block w-full p-3 pl-3 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0.0"
              required
            />
            <span
              className="absolute bottom-2.5 text-sm py-1 cursor-pointer text-blue-500 right-2.5"
            >
              Max
            </span>
          </div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2">
            Unstake
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center  w-[100%] text-center">
        <div className="flex flex-row items-center w-[100%] text-center">
          <img src={icon2} className="h-10 w-10" />
          <div className="pt-1 ml-2">
            <div className="py-5 text-xs py-0 flex flex-row items-center text-left">
              {text2}
              <TooltipComponent
                content={"Claim your LP token rewards and confirm the transaction in your wallet."}
              />
            </div>
            <p className="text-xl text-start">{balance}</p>
          </div>
        </div>
        <div className="flex flex-row w-[100%] justify-end">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2">
            Claim Rewards
          </button>
        </div>
      </div>
    </div>
  );
}
